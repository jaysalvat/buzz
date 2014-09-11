'use strict'

describe('buzz.group', function() {
	
	var fixture = "fixtures/click",
		formats = [ "ogg", "mp3", "aac", "wav" ];
	
	it('should list all sounds loaded', function() {
		var myGroup = new buzz.group([ 
			new buzz.sound(fixture, { formats: formats }),
			new buzz.sound(fixture, { formats: formats }),
			new buzz.sound(fixture, { formats: formats })
		]);
		
		expect(myGroup.getSounds().length).toBe(3);
	});
	
	it('should add a new sound to the group', function() {
		var myGroup = new buzz.group([ 
			new buzz.sound(fixture, { formats: formats }),
			new buzz.sound(fixture, { formats: formats }),
			new buzz.sound(fixture, { formats: formats })
		]);
		
		var newSound = new buzz.sound(fixture, { formats: formats });

		myGroup.add(newSound);
		
		expect(myGroup.getSounds().length).toBe(4);
	});

	it('should remove a sound from the group', function() {
		var specificSound = new buzz.sound(fixture, { formats: formats });

		var myGroup = new buzz.group([ 
			new buzz.sound(fixture, { formats: formats }),
			specificSound,
			new buzz.sound(fixture, { formats: formats })
		]);
	
		expect(myGroup.getSounds().length).toBe(3);

		myGroup.remove(specificSound);

		expect(myGroup.getSounds().length).toBe(2);
	});
});