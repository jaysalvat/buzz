'use strict'

describe('buzz.sound', function() {
	
	var fixture  = 'fixtures/click',
		formats  = [ "ogg", "mp3", "aac", "wav" ],
		sound    = new buzz.sound(fixture, { formats: formats }),
		matchers = {
			isPlaying: function() {
				return this.actual.getTime() > 0;
			}
		};
		
	var songHasStarted = function(done) {
		var past = sound.getTime();

		setTimeout(function() {
			if (sound.getTime() > past) {
				done();
			}
		}, 1000);
	};
	

	describe('initializing a sound', function() {
		var sound;
		
		afterEach(function() {
			jasmine.Expectation.addMatchers(matchers);
		});
	
		it('should start playing a sound with volume 10', function() {
			sound = new buzz.sound(fixture, { 
				formats: formats,
				volume: 10
			});
			
			expect(sound.getVolume()).toBe(10);
		});
		
		it('should not load when the file doesnt exists', function() {
			try {
				sound = new buzz.sound('mydummysong', { formats: formats });
			} catch(e) {
				expect(sound).toThrow(e);
			}
		});

		it('should not preload when the preload option==false', function() {
			sound = new buzz.sound(fixture, { formats: formats, preload:false });
			sound.bind('loadeddata', function(e){
				e.stopPropagation();
    			e.preventDefault();
    			expect('ASYNC FAILURE IN should not preload when the preload option==false').toBe(false);
			});
		});
	});
	
	describe('audio control', function() {
		beforeEach(function(done) {
			jasmine.Expectation.addMatchers(matchers);

			sound.play();
			songHasStarted(done);
		});
	
		afterEach(function() {
			sound.stop();
		});
		
		it('should play a song normally', function() {
			expect(sound.getTime()).toBeGreaterThan(0);
		});
		
		it('should pause a song', function() {
			sound.pause();
			expect(sound.isPaused()).toBeTruthy();
		});
		
		it('should stop a song', function() {
			sound.stop();
			expect(sound.getTime()).toBe(0);
			expect(sound.isPaused()).toBeTruthy();
		});
	});
	
	describe('volume control', function() {
		beforeEach(function() {
			sound.play();
			songHasStarted();
			
			sound.setVolume(10);
		});
	
		afterEach(function() {
			sound.stop();
		});
		
		it('should increase the volume up to 10', function() {
			var vol = 10;
			
			sound.increaseVolume(vol);
			expect(sound.getVolume()).toBe(20);
		});
		
		it('should decrease the volume up to 5', function() {
			var vol = 5;
			
			sound.decreaseVolume(vol);
			expect(sound.getVolume()).toBe(5);
		});
		
		it('should decrease the volume to 0 if the volume is a negative number', function() {
			var vol = 20;
			
			sound.decreaseVolume(vol);
			expect(sound.getVolume()).toBe(0);
		});
		
		it ('should increase the volume up to the maximum if the volume is greater than 100', function() {
			var vol = 100000;
			
			sound.increaseVolume(vol);
			expect(sound.getVolume()).toBe(100);
		});
		
		it ('should mute the sound', function() {
			sound.mute();
			
			expect(sound.getVolume()).toBeGreaterThan(0);
			expect(sound.isMuted()).toBeTruthy();
		});
	});
});