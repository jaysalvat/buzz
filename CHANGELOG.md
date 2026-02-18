# Buzz, a Javascript HTML5 Audio library

## CHANGE LOG

### Buzz 2.0.0 2026-02-17

**Major Release - Breaking Changes**

#### Promise Support
- Add Promise support to `fadeTo()`, `fadeIn()`, `fadeOut()`, and `whenReady()`
- Maintain 100% backward compatibility with callback pattern
- Return Promise when no callback provided, otherwise return `this` for chaining
- Support async/await syntax

#### Modern JavaScript
- Modernize codebase with ES2015+ syntax
- Add TypeScript definitions (`buzz.d.ts`)

#### Build & Distribution
- Simplify build to 2 files: `buzz.js` (ES Module) + `buzz.min.js` (UMD minified)
- Remove `buzz.esm.js` (replaced by `buzz.js`)
- Modern import support: `import buzz from 'buzz'`
- Legacy CDN support: `<script src="buzz.min.js"></script>`
- Source maps included for minified version

#### Testing
- Replace Jasmine with lightweight Puppeteer-based tests
- Comprehensive tests
- Headless browser testing

#### Breaking Changes
- Remove Jasmine test framework
- Change build output: no more `buzz.esm.js`, use `buzz.js` instead
- `buzz.js` is now ES Module format (use `buzz.min.js` for UMD/CDN)
- Require ES2015+ browser support

#### Migration Guide
```javascript
// Before (callbacks only)
mySound.fadeIn(1000, function() {
    console.log('Done!');
});

// After (still works + Promise support)
// Option 1: Callbacks (backward compatible)
mySound.fadeIn(1000, function() {
    console.log('Done!');
});

// Option 2: Promises
mySound.fadeIn(1000).then(() => {
    console.log('Done!');
});

// Option 3: async/await
await mySound.fadeIn(1000);
console.log('Done!');
```

### Buzz 1.2.0 2016-05-22

- Add crossOrigin support to allow CORS
- Fix a multiple FadeIn/FadeOut issue

### Buzz 1.1.10 2015-04-20

* Fix #93 readOnly networkState error

### Buzz 1.1.9 2015-03-03

* Don't create the AudioContext unless it is needed

### Buzz 1.1.8 2015-01-12

* Trigger sourceerror when sound file is not found

### Buzz 1.1.7 2014-10-13

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