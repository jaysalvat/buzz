// ----------------------------------------------------------------------------
// Boom - A tiny audio library 
// v 1.0 alpha
// Dual licensed under the MIT and GPL licenses.
// http://boom.jaysalvat.com/
// ----------------------------------------------------------------------------
// Copyright (C) 2011 Jay Salvat
// http://jaysalvat.com/
// ----------------------------------------------------------------------------
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files ( the "Software" ), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
// ----------------------------------------------------------------------------
var boom = {
    defaults: {
        preload: 'metadata', // auto, metadata, none
        autoplay: false, // bool
        loop: false, // bool
        volume: 100,
        placeholder: '--'
    },
    sounds: [],
    el: document.createElement( 'audio' ),
    isSupported: function() {
        return  !!( this.el.canPlayType );
    },
    isOGGSupported: function() {
        return !!this.el.canPlayType && this.el.canPlayType( 'audio/ogg; codecs="vorbis"' );
    },
    isWAVSupported: function() {
        return !!this.el.canPlayType && this.el.canPlayType( 'audio/wav; codecs="1"' );
    },
    isMP3Supported: function() {
        return !!this.el.canPlayType && this.el.canPlayType( 'audio/mpeg;' );
    },
    isAACSupported: function() {
        return !!this.el.canPlayType && ( this.el.canPlayType( 'audio/x-m4a;' ) || this.el.canPlayType( 'audio/aac;' ) );
    },
    sound: function( src, options ) {
        var options = options || {},
            events = [],
            supported = boom.isSupported();

        this.load = function() {
            if ( !supported ) return this;

            this.sound.load();
            return this;
        }
        this.play = function() {
            if ( !supported ) return this;

            this.sound.play();
            return this;
        }
        this.stop = function() {
            if ( !supported  ) return this;
            
            this.setTime(0);
            this.sound.pause();
            return this;
        }
        this.isEnded = function() {
            if ( !supported ) return null;

            return this.sound.ended;
        }
        this.pause = function() {
            if ( !supported ) return this;

            this.sound.pause();
            return this;
        }
        this.isPaused = function() {
            if ( !supported ) return null;

            return this.sound.paused;
        }
        this.mute = function() {
            if ( !supported ) return this;
            
            this.sound.muted = true;
            return this;
        }
        this.unmute = function() {
            if ( !supported ) return this;
            
            this.sound.muted = false;
            return this;
        }
        this.toggleMute = function() {
            if ( !supported ) return this;

            this.sound.muted = !this.sound.muted;
            return this;
        }
        this.isMuted = function() {
            if ( !supported ) return null;

            return this.sound.muted;
        }
        this.togglePlay = function() {
            if ( !supported ) return this;
            
            if ( this.sound.paused ) {
                this.sound.play();
            } else {
                this.sound.pause();
            }
            return this;
        }
        this.setVolume = function( volume ) {
            if ( !supported ) return this;

            if ( volume < 0 ) volume = 0;
            if ( volume > 100 ) volume = 100;
            this.volume = volume;
            this.sound.volume = volume / 100;
            return this;
        },
        this.getVolume = function() {
            if ( !supported ) return this;

            return this.volume;
        }
        this.increaseVolume = function( value ) {
            return this.setVolume( this.volume + ( value || 1 ) );
        }
        this.decreaseVolume = function( value ) {
            return this.setVolume( this.volume - ( value || 1 ) );
        }
        this.setTime = function( time ) {
            if ( !supported ) return this;

            if ( time instanceof String) {
                var splits = time.split( ':' );
                if ( splits && splits.length == 3 ) {
                    time = ( parseInt( splits[0] ) * 3600 ) + ( parseInt(splits[1] ) * 60 ) + parseInt( splits[2] );
                } 
                if ( splits && splits.length == 2 ) {
                    time = ( parseInt( splits[0] ) * 60 ) + parseInt( splits[1] );
                }
            }
            try {
                this.sound.currentTime = time;
            } catch(e) {}
            return this;
        }
        this.getTime = function() {
            if ( !supported ) return null;

            var time = Math.round( this.sound.currentTime * 100 ) / 100;
            return isNaN(time) ? boom.defaults.placeholder : time;
        }
        this.getDuration = function() {
            if ( !supported ) return null;

            var duration = Math.round( this.sound.duration * 100 ) / 100;
            return isNaN(duration) ? boom.defaults.placeholder : duration;
        }
        this.setPercent = function( time ) {
            if ( !supported ) return this;

            return this.setTime( this.sound.duration * time / 100 );
        }
        this.getPercent = function() {
            if ( !supported ) return null;

            var percent = Math.round( (this.sound.currentTime / this.sound.duration * 100 ) * 100) / 100;
            return isNaN(percent) ? boom.defaults.placeholder : percent;
        }
        this.set = function( key, value ) {
            if ( !supported ) return this;

            this.sound[ key ] = value;
            return this;
        }
        this.get = function( key ) {
            if ( !supported ) return null;

            return key ? this.sound[ key ] : this.sound;
        }
        this.bind = function( type, func ) {
            if ( !supported ) return this;

            var idx = type;
            if ( type.indexOf( '.' ) > -1 ) {
                type = type.split( '.' )[1];
            }
            events.push( { idx: idx, func: func } );
            this.sound.addEventListener( type, func, true );
            return this;
        }
        this.unbind = function( type ) {
            if ( !supported ) return this;

            var idx = type;
            if ( type.indexOf( '.' ) > -1 ) {
                type = type.split( '.' )[1];
            }
            for( var i in events ) {
                var namespace = events[ i ].idx.match( /\.(.*)/ );
                 if ( events[ i ].idx == idx || ( namespace && namespace[1] == idx.replace('.', '') ) ) {
                    this.sound.removeEventListener( type, events[ i ].func );
                    delete events[ i ];
                }   
            }
            return this;
        }
        this.destroy = function() {
            if ( !supported ) return this;

            for( var i in boom.sounds ) {
                if ( boom.sounds[ i ] == this ) {
                    delete boom.sounds[ i ];
                    break;
                }
            }
            return this;
        }
        
        if ( supported ) {
            for( var i in boom.defaults ) {
                options[ i ] = options[ i ] || boom.defaults[ i ];
            }

            this.sound = document.createElement( 'audio' );
            if ( src instanceof Array ) {
                for( var i in src ) {
                    var source = document.createElement( 'source' );
                    source.src = src[ i ];
                    this.sound.appendChild( source );
                }
            } else {
                this.sound.src = src;
            }
            if ( options.loop ) {
                this.bind('boomloop.ended', function() {
                    this.currentTime = 0;
                    this.play();
                });
            }
            if ( options.autoplay ) {
                this.sound.autoplay = 'autoplay';
            }
            this.sound.preload = options.preload;
            this.volume = options.volume;

            boom.sounds.push( this );
        }
    },
    all: function() {
      return new boom.group( boom.sounds );
    },
    group: function( sounds ) {
        fn = function() {
            var args = Array.prototype.slice.call( arguments ),
                func = args.shift();

            for( var i in sounds ) {
                sounds[ i ][ func ].apply( sounds[ i ], args );
            }
        }
        this.play = function() {
            fn( 'play' );
        }
        this.stop = function() {
            fn( 'stop' );
        }
        this.pause = function( time ) {
            fn( 'pause', time );
        }
        this.togglePlay = function( ) {
            fn( 'togglePlay' );
        }
        this.mute = function() {
            fn( 'mute' );
        }
        this.unmute = function() {
            fn( 'unmute' );
        }
        this.toggleMute = function() {
            fn( 'toggleMute' );
        }
        this.setVolume = function( volume ) {
            fn( 'setVolume', volume );
        }
        this.increaseVolume = function( value ) {
            fn( 'increaseVolume', value );
        }
        this.decreaseVolume = function( value ) {
            fn( 'decreaseVolume', value );
        }
        this.setTime = function( time ) {
            fn( 'setTime', time );
        }
        this.set = function( key, value ) {
            fn( 'set', key, value );
        }
        this.bind = function( type, func ) {
            fn( 'bind', type, func );
        }
        this.unbind = function( type ) {
            fn( 'unbind', type );
        }
        this.destroy = function() {
            fn( 'destroy' );
        }
    },
    formatTime: function( s, withHours ) {
        h = Math.floor( s / 3600 );
        h = isNaN(h) ? '--' : ( h >= 10 ) ? h : '0' + h;            
        m = withHours ? Math.floor( s / 60 % 60 ) : Math.floor( s / 60 );
        m = isNaN(m) ? '--' : ( m >= 10 ) ? m : '0' + m;
        s = Math.floor( s % 60 );
        s = isNaN(s) ? '--' : ( s >= 10 ) ? s : '0' + s;
        return withHours ? h + ':' + m + ':' + s : m + ':' + s;
    }
}