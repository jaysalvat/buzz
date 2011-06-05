var boom = {
    defaults: {
        preload: 'metadata', // auto, metadata, none
        autoplay: false, // true, false
        loop: false, // true, false
        volume: 100
    },
    sounds: [],
    sound: function( src, settings ) {
        var settings = settings || {},
            options = {},
            events = [];
        
        for( var i in boom.defaults ) {
            options[ i ] = settings[ i ] || boom.defaults[ i ];
        }
        
        this.sound = document.createElement( 'audio' );
        this.sound.setAttribute( 'src', src );
        this.sound.setAttribute( 'preload', options.preload );
        this.volume = options.volume;
        
        if ( options.loop ) {
            this.sound.setAttribute( 'loop', true );
        }
        if ( options.autoplay ) {
            this.sound.setAttribute( 'autoplay', true );            
        }

        boom.sounds.push( this );
        
        this.play = function() {
            this.sound.play();
            return this;
        }
        this.stop = function() {
            this.sound.currentTime = 0;
            this.sound.pause();
            return this;
        }
        this.pause = function() {
            this.sound.pause();
            return this;
        }
        this.jump = function( time ) {
            this.setTime( time );
            return this;
        }
        this.toggle = function( ) {
            if ( this.sound.paused ) {
                this.sound.play();
            } else {
                this.sound.pause();
            }
            return this;
        }
        this.setVolume = function( volume ) {
            if ( volume > 100 ) {
                volume = 100;
            } 
            if ( volume < 0 ) {
                volume = 0;
            }
            this.volume = volume;
            this.sound.volume = volume / 100;
            return this;
        },
        this.getVolume = function() {
            return this.volume;
        }
        this.increaseVolume = function( value ) {
            this.setVolume( this.volume + ( value || 1 ) );
            return this;
        }
        this.decreaseVolume = function( value ) {
            this.setVolume( this.volume - ( value || 1 ) );
            return this;
        }
        this.setTime = function( time ) {
            this.sound.currentTime = time;
            return this;
        }
        this.getTime = function() {
            return Math.round( this.sound.currentTime * 100 ) / 100;
        }
        this.getDuration = function() {
            return Math.round( this.sound.duration * 100 ) / 100;
        }
        this.setPercent = function( time ) {
            this.sound.currentTime = this.sound.duration * time / 100;
            return this;
        }
        this.getPercent = function() {
            return Math.round( (this.sound.currentTime / this.sound.duration * 100 ) * 100) / 100;
        }
        this.set = function( key, value ) {
            this.sound.setAttribute( key, value );
            return this;
        }
        this.get = function( key ) {
            if ( key ) {
                return this.sound.getAttribute( key );
            }
            return this.sound;
        }
        this.bind = function( type, func ) {
            var idx = type;
            if ( type.indexOf( '.' ) > -1 ) {
				type = type.split( '.' )[1];
			}
			events.push( { idx: idx, func: func } );
            this.sound.addEventListener( type, func ); 
            return this;
        }
        this.unbind = function( type ) {
            var idx = type;
            if ( type.indexOf( '.' ) > -1 ) {
                type = type.split( '.' )[1];
			}
			for( var i in events ) {
			    var c = events[ i ].idx.match( /\.(.*)/ );
			 	if ( events[ i ].idx == idx || ( c && c[1] == idx.replace('.', '') ) ) {
                    this.sound.removeEventListener( type, events[ i ].func );
                    delete events[ i ];
			    }   
			}
            return this;
        }
        this.destroy = function() {
            for( var i in boom.sounds ) {
                if ( boom.sounds[ i ] == this ) {
                    delete boom.sounds[ i ];
                    break;
                }
            }
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
                sounds[ i ][ func ]( args );
            }
        }
        this.play = function() {
            fn( 'play' );
        }
        this.stop = function() {
            fn( 'stop' );
        }
        this.jump = function( time ) {
            fn( 'jump', time );
        }
        this.toggle = function( ) {
            fn( 'toggle' );
        }
        this.setVolume = function( volume ) {
            fn( 'setVolume', volume );
        },
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
    }
}