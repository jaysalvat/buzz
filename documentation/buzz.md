# Documentation: Buzz

{:.intro} [Buzz](http://buzz.jaysalvat.com) is a small Javascript library that
helps you to easily include and manage sounds in your websites using the
[HTML5 audio tag](https://developer.mozilla.org/en/docs/Web/HTML/Element/audio).
It degrades silently on non-modern browsers.

## Constructor

#### new buzz.sound( _sources_, _settings_ )

Create a new sound instance.

```
var mySound = new buzz.sound("/sounds/mysound.ogg");
```

#### new buzz.group( _sounds_ )

Create a group of sound instances. See [Group section](/documentation/group) for more details.

```
var myGroup = new buzz.group([
    new buzz.sound("/sounds/mysound1.ogg"),
    new buzz.sound("/sounds/mysound2.ogg"),
    new buzz.sound("/sounds/mysound3.ogg")
]);
```

## Methods

#### buzz.all()
Allow to act on all sound instances. Take a look to the Group section for more details.

```
var mySound1 = new buzz.sound("/sounds/mysound1.ogg"),
    mySound2 = new buzz.sound("/sounds/mysound2.ogg"),
    mySound3 = new buzz.sound("/sounds/mysound3.ogg");
buzz.all().play();
```

#### buzz.isSupported()
Check if the HTML5 audio tag is supported by the browser.

```
if (!buzz.isSupported()) {
    alert("Your browser is too old, time to update!");
}
```

#### buzz.isOGGSupported()
Check if the OGG audio format is supported by the browser.

```
if (!buzz.isOGGSupported()) {
    alert("Your browser doesn't support OGG Format.");
}
```

#### buzz.isWAVSupported()
Check if the WAV audio format is supported by the browser.

```
if (!buzz.isWAVSupported()) {
    alert("Your browser doesn't support WAV Format.");
}
```

#### buzz.isMP3Supported()
Check if the MP3 audio format is supported by the browser.

```
if (!buzz.isMP3Supported()) {
    alert("Your browser doesn't support MP3 Format.");
}
```

#### buzz.isAACSupported()
Check if the AAC audio format is supported by the browser.

```
if (!buzz.isAACSupported()) {
    alert("Your browser doesn't support AAC Format.");
}
```

## Helpers

#### buzz.toTimer( _seconds_, _long_ )
Format seconds in an easy to read timer like 00:00 or 00:00:00 if long is set to true.

```
var mySound = new buzz.sound("/sounds/mysound.ogg"),
    timer = buzz.toTimer(mySound.getDuration());

document.getElemetById("duration").innerHTML = timer;
```

#### buzz.fromTimer( _timer_ )
Convert a timer as 00:00 or 00:00:00 in seconds.

```
var mySound = new buzz.sound("/sounds/mysound.ogg");

mySound.setTime(buzz.fromTimer("00:30"));
```

#### buzz.toPercent( _value_, _total_, _round_ )
Calculate percentage from values.

```
var mySound  = new buzz.sound("/sounds/mysound.ogg"),
    time     = mySound.getTime(),
    duration = mySound.getDuration(),
    percent  = buzz.toPercent(time, duration, 2);

document.getElementById("percent").innerHTML = percent;
```

#### buzz.fromPercent( _value_, _total_, _round_ )
Calculate value from a percentage.

```
var mySound = new buzz.sound("/sounds/mysound.ogg");

mySound.setTime(buzz.fromPercent("20", mySound.getDuration());
```

## Properties

#### buzz.defaults
Object of properties. All the default settings can be set globaly.

```
// Preload the sound — auto, metadata, none
buzz.defaults.preload = 'auto';
// Play the sound when ready — bool
buzz.defaults.autoplay = false;
// Loop the sound — bool
buzz.defaults.loop = false;
// value to display when a time convertion is impossible
buzz.defaults.placeholder = '--';
// Duration of a fading effect — milliseconds
buzz.defaults.duration = 5000;
// Audio formats of your files
buzz.defaults.formats = [ 'ogg', 'mp3', 'aac', 'wav' ];
```

#### buzz.sounds
Array of all the sound instances created.

```
for (var i in buzz.sounds) {
    buzz.sounds[i].mute();
}
```
