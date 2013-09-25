'use strict'

describe('buzz.sound', function() {
	
	var sound,
		file = '../fixtures/song.mp3',
		matchers = {
			toBePlaying: function() {
				console.log(this);
				
				var audio = this.actual.el;
				var past = this.actual.el.currentTime;
				
				return setTimeout(function() {
	                return audio.element.currentTime == past;
	            }, 1100);
			}
		};
	
	beforeEach(function() {
		sound = new buzz.sound(file);
		this.addMatchers(matchers);
	});
	
	it ('should not load when the song doesnt exists', function() {
		try {
			sound = new buzz.sound('mydummysong.mp3');
		} catch(e) {
			expect(sound).toThrow(e);
		}
	});
	
});