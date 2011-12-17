# Buzz, a Javascript HTML5 Audio library

## CHANGE LOG

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