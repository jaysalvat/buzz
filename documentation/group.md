# Documentation: Group

{:.intro} [Buzz](http://buzz.jaysalvat.com) provides a way to group sounds and
many methods to control them. This section lists these methods and helpful
information about using them.

## Constructor

#### new buzz.group( _sounds_ )

Create a new group of sound instances. See [Sound section](/documentation/sound) for more details.

```
var mySound1 = new buzz.sound("/sounds/mysound1.ogg"),
    mySound2 = new buzz.sound("/sounds/mysound2.ogg"),
    mySound3 = new buzz.sound("/sounds/mysound3.ogg");
```

Sounds can be added to a group by passing an array to the constructor.

```
var myGroup = new buzz.group([
    mySound1,
    mySound2,
    mySound3
]);
```

Sounds can be added to a group by passing each sound as an argument to the constructor.

```
var myGroup = new buzz.group(mySound1, mySound2, mySound3);
```

#### buzz.all()
buzz.all() is a convenient predefined group containing all the buzz sound instances.

```
var mySound1 = new buzz.sound("/sounds/mysound1.ogg"),
    mySound2 = new buzz.sound("/sounds/mysound2.ogg"),
    mySound3 = new buzz.sound("/sounds/mysound3.ogg");

buzz.all().play();
```

### Methods

Except getters, almost all the sound methods are available in a group. Those methods are chainable.

```
myGroup.loop().play().fadeIn();
```

#### group.Load()
Load the sounds.

```
myGroup.load();
```

### Playback

#### group.play()
Load the sounds and begin playback.

```
myGroup.play();
```

#### group.pause()
Pause the sounds. If the playback is started again, it will restart from here.

```
myGroup.pause();
```

#### group.togglePlay()
Automatically pause or play the sound.

```
myGroup.togglePlay();
```

#### group.stop()
Stop the sound. If the playback is started again, it will restart from the start.

```
myGroup.stop();
```

#### group.loop()
Keep re-playing the sounds once it has finished.

```
myGroup.loop();
```

#### group.unloop()
Stop re-playing the sounds once it has finished.

```
myGroup.unloop();
```

### Volume

#### group.mute()
Mute the sounds.

```
myGroup.mute();
```

#### group.unmute()
Unmute the sounds.

```
myGroup.unmute();
```

#### group.toggleMute()
Automatically mute or unmute the sound.

```
myGroup.toggleMute();
```

#### group.setVolume(_volume_)
Set the volume of the sounds. The range is 0-100.

```
myGroup.setVolume(90);
```

#### group.increaseVolume( _[volume]_ )
Increase the volume of the sounds by 1 or {volume}.

```
myGroup.increaseVolume(); // Current volume +1
```

#### group.decreaseVolume( _[volume]_ )
Decrease the volume of the sounds by 1 or {volume}.

```
myGroup.decreaseVolume(10); // Current volume -10
```

#### group.fadeIn( _[duration]_, _[callback]_ )
Fade the volume of the sounds in (from 0 to 100) in {duration} milliseconds.
A {callback} function can be set and called when the fade-in is complete.

```
myGroup.fadeIn(2000);
```

#### group.fadeOut( _[duration]_, _[callback]_ )
Fade the volume of the sounds out (from current volume to 0) in {duration}
milliseconds. A {callback} function can be set and called when the fade-out
is complete.

```
myGroup.fadeOut(2000);
```

#### group.fadeTo( _volume_, _[duration]_, _[callback]_ )
Fade the volume of the sounds from the current volume to {volume} in {duration}
milliseconds. A {callback} function can be set and called when the fade-in
is complete.

```
// Fade volume from 20 to 90 in 2 seconds and then back to 20.
myGroup.setVolume(20).fadeTo(90, 2000, function () {
    this.fadeTo(20, 2000);
});
```

### Events

#### group.bind( _event_, _callback_ )
Add one or many event listeners to the sounds. See [Event section](/documentation/events) for more details.

```
myGroup.bind("ended pause", function () {
    var time = this.getTime(),
        duration = this.getDuration(),
        percent = buzz.toPercent(time, duration),
        message = "Stopped or paused at " + percent + "%";

    document.getElementById("percent").innerHTML = message;
});
```

Events can be namespaced. Namespacing allows to unbind or trigger some events of a type without affecting others.

```
myGroup.bind("ended.one pause.one", function () {
    alert("Event type one");
}).bind("ended.two pause.two", function () {
    alert("Event type two");
});
```

#### group.bindOnce( _event_, _callback_ )
Add one or many event listeners to be executed at once. See [Event section](/documentation/events) for more details.

```
myGroup.bindOnce("pause", function () {
    alert("To be executed only at the first pause.");
});
```

#### group.unbind( _event_ )
Remove the event listeners bound to a sound. Events to unbind can be set by namespaces.

```
myGroup.unbind("ended.one .two");
```

#### group.trigger( _event_ )
Execute the handlers attached to an event. Note that only the functions are trigged, not the native event.

```
myGroup.trigger("ended.one");
```

### Setters

#### group.setTime( _seconds_ )
Set the playback position in seconds.

```
myGroup.setTime(90);
```

The fromTimer helper can be useful here.

```
myGroup.setTime(buzz.fromTimer("01:30"));
```

#### group.setPercent( _percent_ )
Set the playback position in {percent}.

```
myGroup.setPercent(50); // 50%
```

#### group.SetSpeed( _speed_ )
Set the playback speed where 1 is normal speed, 2 is double speed, etc.

```
myGroup.SetSpeed(2); // x2
```

#### group.set( _property_, _value_ )
Directly set the native properties of an HTML5 audio element.

```
myGroup.set("volume", 0.5);
myGroup.set("currentTime", 90);
```
