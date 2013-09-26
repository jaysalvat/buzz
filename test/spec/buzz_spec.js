'use strict'

describe('buzz.group', function() {
	
	var fixture = "fixtures/song.mp3";
	
	it('should list all sounds loaded', function() {
		var myGroup = new buzz.group([ 
		    new buzz.sound(fixture),
		    new buzz.sound(fixture),
		    new buzz.sound(fixture)
		]);
		
		expect(myGroup.getSounds().length).toBe(3);
	});
	
	it('should add a new sound to the group', function() {
		var myGroup = new buzz.group([ 
		    new buzz.sound(fixture),
		    new buzz.sound(fixture),
		    new buzz.sound(fixture)
		]);
		
		var newSound = new buzz.sound(fixture);
		myGroup.add(newSound);
		
		expect(myGroup.getSounds().length).toBe(4);
	});

});