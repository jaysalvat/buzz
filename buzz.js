// ----------------------------------------------------------------------------
// buzz - A HTML5 audio library 
// v 1.0 alpha
// Dual licensed under the MIT and GPL licenses.
// http://buzz.jaysalvat.com/
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

var buzz = {
    defaults: {
        preload: 'metadata', // bool | 'metadata'
        autoplay: false, // bool
        loop: false, // bool
        placeholder: '--',
        fadeSpeed: 5000,
        formats: []
    },
    sounds: [],
    sound: function( src, options ) {
        var options = options || {},
            pid = 0,
            events = [],
            eventsOnce = {},
            supported = buzz.isSupported();

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
        this.togglePlay = function() {
            if ( !supported ) return this;
            
            if ( this.sound.paused ) {
                this.sound.play();
            } else {
                this.sound.pause();
            }
            return this;
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
        this.stop = function() {
            if ( !supported  ) return this;
            
            this.setTime( 0 );
            this.sound.pause();
            return this;
        }
        this.isEnded = function() {
            if ( !supported ) return null;

            return this.sound.ended;
        }
        this.loop = function() {
            this.sound.loop = 'loop';
            this.bind( 'ended.buzzloop', function() {
                this.currentTime = 0;
                this.play();
            });
        }
        this.unloop = function() {
            this.sound.removeAttribute( 'loop');
            this.unbind( 'ended.buzzloop' );
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
            
            this.whenReady( function() {
                this.sound.currentTime = time;
            });
            return this;
        }
        this.getTime = function() {
            if ( !supported ) return null;

            var time = Math.round( this.sound.currentTime * 100 ) / 100;
            return isNaN( time ) ? buzz.defaults.placeholder : time;
        }
        this.setPercent = function( time ) {
            if ( !supported ) return this;

            return this.setTime( this.sound.duration * time / 100 );
        }
        this.getPercent = function() {
            if ( !supported ) return null;

            var percent = Math.round( ( this.sound.currentTime / this.sound.duration * 100 ) * 100 ) / 100;
            return isNaN( percent ) ? buzz.defaults.placeholder : percent;
        }
        this.setSpeed = function( speed ) {
            this.sound.playbackRate = speed;
        }
        this.getSpeed = function() {
            return this.sound.playbackRate;
        }
        this.getDuration = function() {
            if ( !supported ) return null;

            var duration = Math.round( this.sound.duration * 100 ) / 100;
            return isNaN( duration ) ? buzz.defaults.placeholder : duration;
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
        this.getErrorCode = function() {
            if ( this.sound.error ) {
                return this.sound.error.code;
            }
            return 0;
        }
        this.getErrorMessage = function() {
            switch( this.getErrorCode() ) {
                case 1: 
                    return 'MEDIA_ERR_ABORTED';
                case 2:
                    return 'MEDIA_ERR_NETWORK';
                case 3:
                    return 'MEDIA_ERR_DECODE';
                case 4: 
                    return 'MEDIA_ERR_SRC_NOT_SUPPORTED';
                default:
                    return null;
            }
        }
        this.getStateCode = function() {
            return this.sound.readyState;
        }
        this.getStateMessage = function() {
            switch( this.getStateCode() ) {
                case 0: 
                    return 'HAVE_NOTHING';
                case 1:
                    return 'HAVE_METADATA';
                case 2:
                    return 'HAVE_CURRENT_DATA';
                case 3: 
                    return 'HAVE_FUTURE_DATA';
                case 4: 
                    return 'HAVE_ENOUGH_DATA';
                default:
                    return null;
            }
        }
        this.getNetworkStateCode = function() {
            return this.sound.networkState;
        }
        this.getNetworkStateMessage = function() {
            switch( this.getNetworkStateCode() ) {
                case 0: 
                    return 'NETWORK_EMPTY';
                case 1:
                    return 'NETWORK_IDLE';
                case 2:
                    return 'NETWORK_LOADING';
                case 3: 
                    return 'NETWORK_NO_SOURCE';
                default:
                    return null;
            }
        }
        this.bind = function( types, func ) {
            if ( !supported ) return this;

            var that = this,
                types = types.split( ' ' ),
				efunc = function( e ) { func.call( that, e ) };
            
            for( var t in types ) {
                var type = types[ t ],
                    idx = type;                
				    type = idx.split( '.' )[ 0 ];

                    events.push( { idx: idx, func: efunc } );
                    this.sound.addEventListener( type, efunc, true );
            }
            return this;
        }
        this.unbind = function( types ) {
            if ( !supported ) return this;

            var types = types.split( ' ' );
                        
            for( var t in types ) {
                var idx = types[ t ];
				    type = idx.split( '.' )[ 0 ];

                for( var i in events ) {
                    var namespace = events[ i ].idx.split( '.' );
                    if ( events[ i ].idx == idx || ( namespace[ 1 ] && namespace[ 1 ] == idx.replace( '.', '' ) ) ) {
				        this.sound.removeEventListener( type, events[ i ].func, true );
                        delete events[ i ];
                    }
                }
            }
            return this;
        }
        this.bindOnce = function( type, func ) {
            if ( !supported ) return this;
            
            var that = this;
            
            eventsOnce[ pid++ ] = false;
            this.bind( pid + type, function() {
               if ( !eventsOnce[ pid ] ) {
                   eventsOnce[ pid ] = true;
                   func.call( that );                   
               }
               that.unbind( pid + type );
            });
        }
        this.trigger = function( types ) {
            if ( !supported ) return this;

            var types = types.split( ' ' );
                        
            for( var t in types ) {
                var idx = types[ t ];

                for( var i in events ) {
                    var namespace = events[ i ].idx.split( '.' );
                    if ( events[ i ].idx == idx || ( namespace[ 0 ] && namespace[ 0 ] == idx.replace( '.', '' ) ) ) {
					    events[ i ].func.apply( this );
                    }   
                }
            }
            return this;
        }
        this.fade = function( from, to, speed, callback ) {
            if ( speed instanceof Function ) {
                callback = speed;
                speed = buzz.defaults.fadeSpeed;
            } else {
                speed = speed || buzz.defaults.fadeSpeed;
            }

            var delay = speed / Math.abs( from - to ),
                that = this;
            this.play();
            that.setVolume( from );
            
            function doFade() {
                setTimeout( function() {
                    if ( from < to && that.volume < to ) {
                        that.setVolume( that.volume += 1 );
                        doFade();
                    } else if ( from > to && that.volume > to ) {
                        that.setVolume( that.volume -= 1 );
                        doFade();                        
                    } else if ( callback instanceof Function ) {
                        callback.apply( that );
                    }
                }, delay );
            }
            doFade();
        }
        this.fadeIn = function( speed, callback ) {
            speed = speed || buzz.defaults.fadeSpeed;
            var delay = speed / 100,
                that = this;
            this.volume = 0;
            this.play();
            
            function doFade() {
                setTimeout( function() {
                    if ( that.volume < 100 ) {
                        that.setVolume( that.volume += 1 );
                        doFade();
                    } else if ( callback instanceof Function ) {
                        callback.apply( that );
                    }
                }, delay );
            }
            doFade();
        }
        this.fadeOut = function( speed, callback ) {
            speed = speed || buzz.defaults.fadeSpeed;
            var delay = speed / this.volume,
                that = this;

            function doFade() {
                setTimeout( function() {
                    if ( that.volume > 0 ) {
                        that.setVolume( that.volume -= 1 );
                        doFade();
                    } else if ( callback instanceof Function ) {
                        callback.apply( that );
                    }
                }, delay );
            }
            doFade();
        }
        this.fadeWith = function( sound, speed ) {
            this.fadeOut( speed, function() {
                this.stop();
            });
            if ( sound instanceof buzz.sound ) {
                sound.play().fadeIn( speed );
            }
        }
        this.destroy = function() {
            if ( !supported ) return this;

            for( var i in buzz.sounds ) {
                if ( buzz.sounds[ i ] == this ) {
                    delete buzz.sounds[ i ];
                    break;
                }
            }
            return this;
        }
        this.whenReady = function( func ) {
            var that = this;
            if ( this.sound.readyState == 0 ) {
                this.bind( 'canplay.buzzwhenready', function() {
                    func.call( that );
                });
            } else {
                func.call( that );
            }
        }
        
        // init
        if ( supported ) {
            for( var i in buzz.defaults ) {
                options[ i ] = options[ i ] || buzz.defaults[ i ];
            }

            this.sound = document.createElement( 'audio' );
            if ( src instanceof Array ) {
                for( var i in src ) {
                    var source = document.createElement( 'source' );
                    source.src = src[ i ];
                    this.sound.appendChild( source );
                }
            } else if ( options.formats.length ) {
                for( var i in options.formats ) {
                    var source = document.createElement( 'source' );
                    source.src = src + '.' + options.formats[ i ];
                    this.sound.appendChild( source );     
                }
            } else {
                this.sound.src = src;
            }
            if ( options.loop ) {
                this.loop();
            }
            if ( options.autoplay ) {
                this.sound.autoplay = 'autoplay';
            }
            if ( options.preload === true ) {
                this.sound.preload = 'auto';
            } else if ( options.preload === false ) {                
                this.sound.preload = 'none';
            } else {
                this.sound.preload = options.preload;
            }
            this.volume = options.volume;

            buzz.sounds.push( this );
        }
    },
    group: function( sounds ) {
        fn = function() {
            var args = Array.prototype.slice.call( arguments ),
                func = args.shift();

            for( var i in sounds ) {
                sounds[ i ][ func ].apply( sounds[ i ], args );
            }
        }
        this.load = function() {
            fn( 'load' );
            return this;
        }
        this.play = function() {
            fn( 'play' );
            return this;
        }
        this.togglePlay = function( ) {
            fn( 'togglePlay' );
            return this;
        }
        this.pause = function( time ) {
            fn( 'pause', time );
            return this;
        }
        this.stop = function() {
            fn( 'stop' );
            return this;
        }
        this.mute = function() {
            fn( 'mute' );
            return this;
        }
        this.unmute = function() {
            fn( 'unmute' );
            return this;
        }
        this.toggleMute = function() {
            fn( 'toggleMute' );
            return this;
        }
        this.setVolume = function( volume ) {
            fn( 'setVolume', volume );
            return this;
        }
        this.increaseVolume = function( value ) {
            fn( 'increaseVolume', value );
            return this;
        }
        this.decreaseVolume = function( value ) {
            fn( 'decreaseVolume', value );
            return this;
        }
        this.loop = function() {
            fn( 'loop' );
            return this;
        }
        this.unloop = function() {
            fn( 'unloop' );
            return this;
        }
        this.setTime = function( time ) {
            fn( 'setTime', time );
            return this;
        }
        this.setSpeed = function( speed ) {
            fn( 'setSpeed', speed );
            return this;
        }
        this.set = function( key, value ) {
            fn( 'set', key, value );
            return this;
        }
        this.bind = function( type, func ) {
            fn( 'bind', type, func );
            return this;
        }
        this.unbind = function( type ) {
            fn( 'unbind', type );
            return this;
        }
        this.bindOnce = function( type, func ) {
            fn( 'bindOnce', type, func );
            return this;
        }
        this.trigger = function( type ) {
            fn( 'trigger', type );
            return this;
        }
        this.fade = function( from, to, speed, callback ) {
            fn( 'fade', from, to, speed, callback );
            return this;
        }
        this.fadeIn = function( speed, callback ) {
            fn( 'fadeIn', speed, callback );
            return this;
        }
        this.fadeOut = function( speed, callback ) {
            fn( 'fadeOut', speed, callback );
            return this;
        }
        this.destroy = function() {
            fn( 'destroy' );
            return this;
        }
    },
    all: function() {
      return new buzz.group( buzz.sounds );
    },
    el: document.createElement( 'audio' ),
    isSupported: function() {
        return !!this.el.canPlayType;
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
    formatTime: function( time, withHours ) {
        h = Math.floor( time / 3600 );
        h = isNaN( h ) ? '--' : ( h >= 10 ) ? h : '0' + h;            
        m = withHours ? Math.floor( time / 60 % 60 ) : Math.floor( time / 60 );
        m = isNaN( m ) ? '--' : ( m >= 10 ) ? m : '0' + m;
        s = Math.floor( time % 60 );
        s = isNaN( s ) ? '--' : ( time >= 10 ) ? s : '0' + s;
        return withHours ? h + ':' + m + ':' + s : m + ':' + s;
    },
    unformatTime: function( time ) {
        var splits = time.toString().split( ':' );
        if ( splits && splits.length == 3 ) {
            time = ( parseInt( splits[ 0 ] ) * 3600 ) + ( parseInt(splits[ 1 ] ) * 60 ) + parseInt( splits[ 2 ] );
        } 
        if ( splits && splits.length == 2 ) {
            time = ( parseInt( splits[ 0 ] ) * 60 ) + parseInt( splits[ 1 ] );
        }
        return time;
    }
}