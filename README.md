# Gradient color

Gradient color generator

**Attention**: This doc is for `v2.0`, `v1.x` usage is at the end of the doc, and it's deprecated

## Installation

`npm install gradient-color -S`

## Usage

```js
// commonjs style
const gradient = require('gradient-color')
// module import style
// import gradient from 'gradient-color'

const colors = gradient([
  '#E5404C',
  '#FD743C',
  '#FD9C3C'
], 20)

// array of 20 colors in `rgb(x, x, x)` format
console.log(colors)
```

## API

```js
gradient(colorArray, n)
```
where

- **colorArray** is either
  - An array of color strings. This way, each gradient's step is the same
  ```js
  // hex string is supported
  ['#fff', '#ddd', '#eee']
  // rgb string is also ok
  ['rgb(23, 23, 23)', 'rgb(33, 33, 33)']
  ```
  - An array of color object. You can specify each gradient's step value by `frac` field.
  ```js
  [
    {
      color: '#fff',
      frac: 0.4
    },
    {
      color: '#eee',
      frac: 0.4
    },
    {
      color: '#aaa',
      frac: 0.2
    },
    // the last color could either be an object
    {
      color: '#fefefe'
    }
    // or a string value
    // '#fefefe'
  ]
  ```
  If you are using this method, there're several things you should remember:

  1. **The last color should not have a `frac` field**, so it can be either an `Object` with only `color` field or a `String` value
  2. **The sum of all the `frac`s should equal to 1**


- **n** is the number of color that will be generated. **It should be greater than the length of your `colorArray`**, i.e. `n > colorArray.length`


## Upcoming features

- [ ] Alpha channel support

## Nasty old v1.x usage (deprecated)

```js
var getGradient = require('gradient-color').getGradient

var number = 30 // How many units between the two colors
var startColor = "#7e93f5" // start color, must in hex mode
var endColor = "#f32b65" // end color, must in hex mode

var colors = getGradient(number, startColor, endColor)
// output an array, each unit is a color string in "rgb(r,g,b)" format
```
