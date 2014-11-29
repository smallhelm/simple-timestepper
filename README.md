# What it does

Makes your games and simulations update smoothly at a constat time step.

It separates update ticks at and rendering frames at a framerate. This way when writing games and simulations the state of the game updates at a constant time step while the rendering happens as fast as the browsers requestAnimationFrame updates.

# How to use it

```js
var onUpdate = function(){
	//update the state (i.e. update positions, do physics etc...)
};
var onRender = function(){
	//render to the canvas or whatever your render target is
};
var t = timestepper(onUpdate, onRender);

t.start();//start the loop
...
t.stop();//pause the loop
...
t.start();//start the loop again
```
By default it calls update 60 times a second, however you can customize this rate.

If you want it to update 30 frames per second do this
```js
var t = timestepper(onUpdate, onRender, 1/30);
```

There are 3 ways to include this library

## With browserify

```js
var timestepper = require('simple-timestepper');
...
```

## With a script tag

Download [this](https://github.com/smallhelm/simple-timestepper/blob/master/simple-timestepper.min.js) script then include it in your html
```html
<script src="simple-timestepper.min.js"></script>
```

Then use it
```js
var timestepper = SIMPLE_TIMESTEPPER;
...
```

## With RequireJS

```js
require(['simple-timestepper'], function(timestepper) {
	...
});
```

# License
The MIT License (MIT)

Copyright (c) 2014 Small Helm LLC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
