Buzz, a Javascript HTML5 Audio library
======================================

Buzz is a small but powerful Javascript library that allows you to easily take advantage of the new HTML5 audio element. It tries to degrade properly on non-modern browsers.

```javascript
var mySound = new buzz.sound("/sounds/myfile", {
    formats: [ "ogg", "mp3", "aac" ]
});

mySound.play()
    .fadeIn()
    .loop()
    .bind("timeupdate", function () {
        document.querySelector("#timer").innerHTML = buzz.toTimer(this.getTime());
    });
```

### Official website
http://buzz.jaysalvat.com/

### Real life demo
http://buzz.jaysalvat.com/demo/

### Documentation
http://buzz.jaysalvat.com/documentation/

Promise Support
---------------

Buzz now supports both **callback** and **Promise** patterns, maintaining full backward compatibility.

### Methods with Promise support

The following methods now return a Promise when no callback is provided:

- `fadeTo(to, [duration], [callback])`
- `fadeIn([duration], [callback])`
- `fadeOut([duration], [callback])`
- `whenReady([callback])`

### Usage Examples

#### With callbacks (backward compatible)
```javascript
var mySound = new buzz.sound("/sounds/myfile.mp3");

mySound.fadeIn(1000, function() {
    console.log('Fade in complete!');
    this.fadeOut(1000, function() {
        console.log('Fade out complete!');
    });
});
```

#### With Promises
```javascript
var mySound = new buzz.sound("/sounds/myfile.mp3");

mySound.fadeIn(1000)
    .then(() => {
        console.log('Fade in complete!');
        return mySound.fadeOut(1000);
    })
    .then(() => {
        console.log('Fade out complete!');
    });
```

#### With async/await
```javascript
var mySound = new buzz.sound("/sounds/myfile.mp3");

async function playSequence() {
    await mySound.fadeIn(1000);
    console.log('Fade in complete!');

    await mySound.fadeOut(1000);
    console.log('Fade out complete!');
}

playSequence();
```

#### whenReady with Promise
```javascript
var mySound = new buzz.sound("/sounds/myfile.mp3");

// Wait for the sound to be ready before playing
await mySound.whenReady();
mySound.play();
```

See [PROMISE_MIGRATION.md](PROMISE_MIGRATION.md) for a complete migration guide.

Contributing
------------

Please don't edit files in the `dist` subdirectory as it is generated via Grunt. You'll find source code in the `src` subdirectory!
Regarding code style like indentation and whitespace, **follow the conventions you see used in the source already.**

PLEASE DO NOT use Gruntfile. I will. :)

License
-------

**The MIT License (MIT)**

Copyright (c) 2021 Jay Salvat

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
