'use strict'

describe('buzz.sound', function() {
	
	var file = 'fixtures/song.mp3',
		sound = new buzz.sound(file),
		matchers = {
			
		};
	
	describe('audio controls', function() {
		beforeEach(function() {
			this.addMatchers(matchers);
		});
	
		afterEach(function() {
			sound.stop();
		});
		
		var songHasStarted = function() {
			var past = sound.getTime();
			
			waitsFor(function() {
				return sound.getTime() > past;
			}, 'song get started', 1000);
		};
		
		it('should play a song normally', function() {
			sound.play();
			songHasStarted();
			
			runs(function() {
				expect(sound.getTime()).toBeGreaterThan(0);
			});
		});
		
		it('should pause a song', function() {
			sound.play();
			songHasStarted();
			
			runs(function() {
				sound.pause()
				expect(sound.isPaused()).toBeTruthy();
			});
		});
		
		it('should stop a song', function() {
			sound.play();
			songHasStarted();
			
			runs(function() {
				sound.stop()
				expect(sound.getTime()).toBe(0);
				expect(sound.isPaused()).toBeTruthy();
			});
		});
	});
	
	describe('if the song does not exists', function() {
		it('should not load when the song doesnt exists', function() {
			try {
				sound = new buzz.sound('mydummysong.mp3');
			} catch(e) {
				expect(sound).toThrow(e);
			}
		});
	});
});