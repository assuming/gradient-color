exports.getGradient = function(n, startColor, endColor) {
  // add semicolon cause `[` is the at starting char of a line
  let Rx, Gx, Bx, Ry, Gy, By;
  [Rx, Gx, Bx] = hexToRgb(startColor);
  [Ry, Gy, By] = hexToRgb(endColor);

  let newColors = []
  for (var i = 0; i <= n; i++) {
    let r, g, b
    let percent = i / n;
    [r, g, b] = [
      calcColor(Rx, Ry, percent), 
      calcColor(Gx, Gy, percent), 
      calcColor(Bx, By, percent)
    ]

    newColors.push(`rgb(${r},${g},${b})`)
  }

  return newColors
}
// function linearGradient(n, ...args) {
//  args.forEach(color => {

//  })
// }

function calcColor(x, y, percent) {
  return x + Math.floor((y - x) * percent)
}
function hexToRgb(hex) {
  let rgb = []
  hex = hex.substr(1)

  // "#abc" -> "#aabbcc"
  if (hex.length === 3) {
    hex = hex.replace(/(.)/g, '$1$1')
  }
  hex.replace(/../g, color => rgb.push(parseInt(color, 0x10)))

  return rgb
}

