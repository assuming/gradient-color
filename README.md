# Gradient color

Make beautiful gradient color

## USAGE

```js
var getGradient = require('gradient-color').getGradient

var number = 30 // How many units between the two colors
var startColor = "#7e93f5" // start color, must in hex mode
var endColor = "#f32b65" // end color, must in hex mode

var colors = getGradient(number, startColor, endColor)
// output an array, each unit is a color string in "rgb(r,g,b)" format
```


## TODOS

1. [ ] Support all color format (input and output)
2. [ ] Add color stops
3. [ ] Add test file
4. [ ] Build system
5. [ ] OMG, I almost did nothing!