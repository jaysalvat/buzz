{:.intro} [Buzz](http://buzz.jaysalvat.com) is a small Javascript library that
helps you to easily include and manage sounds in your websites using the
[HTML5 audio tag](https://developer.mozilla.org/en/docs/Web/HTML/Element/audio).
It degrades silently on non-modern browsers.

[Buzz](/) is written by [Jay Salvat](http://jaysalvat.com) and licensed under
the [MIT](https://opensource.org/licenses/MIT) License.

{:.button} [ Download Buzz! #version ](http://jaysalvat.github.io/buzz/releases/latest/buzz.zip)

{:.button} [ Fork it on Github ](https://github.com/jaysalvat/buzz)

##### Installation

Download the [ZIP file](#download) above and include it manually or include the
[CDN hosted version](https://cdnjs.com/libraries/buzz).

    https://cdnjs.com/libraries/buzz

Or install it by [NPM](https://www.npmjs.com/package/buzz).

    $ npm install --save buzz

Or install it by [Bower](https://bower.io).

    $ bower install --save buzz


##### API Example

```
var sound = new buzz.sound("/sounds/sound", {
    formats: [ "ogg", "mp3", "aac" ]
});

sound.play()
     .fadeIn()
     .loop()
     .bind("timeupdate", function() {
        var timer = buzz.toTimer(this.getTime());
        document.getElementById("timer").innerHTML = timer;
     });
```
