# Buzz, a Javascript HTML5 Audio library

## CHANGE LOG

### Buzz 1.1.6 2014-10-13

* 'webAudiApi' option set to false by default. Switching to webAudioApi was a bad idea (numerous Firefox bugs)

### Buzz 1.1.5 2014-09-10

* Add 'webAudiApi:true' option to enable/disable webAudioApi routing

### Buzz 1.1.4 2014-07-13

* Improve UMD wrapper

### Buzz 1.1.3 2014-07-11

* Get component.json back

### Buzz 1.1.2 2014-07-07

* Remove component.json and add bower.json

### Buzz 1.1.1 2014-06-25

* Route through web audio API to improve performance if available
* Qualify window.document because some environments (e.g. node-webkit)

### Buzz 1.1.0 2013-08-15

* Fix setTime infinite loop on Firefox
* Fix a couple of method chaining bugs 
* Add AMD and CommonJS support
* Add iframe support
* Fix getPlayed method not returning good values
* Add new architecture src / dist
* Add minified version
* Add Gruntfile 

### Buzz 1.0.6 2013-01-16

* Fix the bindOnce bug
* Fix the Stop/play bug
* Fix the unbind bug
* Replace delete by splice for removing a sound from a group
* Remove group.setDuration method. This method didn't exist
* It's now possible to write a class extending buzz.sound

### Buzz 1.0.5 2011-12-17

* Filtering unwanted properties to avoid weird sources in Firefox and IE
* Fixed JShint warnings
* In static function only access other static members in a static manner
* Define local variables, so they do not become global
* fix adding sounds to group

### Buzz 1.0.4 2011-08-04

* Add types
* Fix the toTimer helper bug with 0
* Fix array iteration for Mootools compatibility
* Fix the ended propery bug
* Fix some bugs where methods didn't degrade properly
* Trigger method triggers real event

### Buzz 1.0.3 2011-07-09

* Set default volume to 80
* Loop and unloop methods now return the instance object

### Buzz 1.0.2 2011-07-04

* Fade effects wait for the sound to be ready before to start
* Loop and unloop methods now return the instance object

### Buzz 1.0.1 2011-07-01

* Fix arguments or array passed to Group constructor or methods
* Fix the default volume effect

### Buzz 1.0.0 2011-06-30

* First public release