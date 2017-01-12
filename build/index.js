'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.getGradient = function (n, startColor, endColor) {
  // add semicolon cause `[` is the at starting char of a line
  var Rx = void 0,
      Gx = void 0,
      Bx = void 0,
      Ry = void 0,
      Gy = void 0,
      By = void 0;

  var _hexToRgb = hexToRgb(startColor);

  var _hexToRgb2 = _slicedToArray(_hexToRgb, 3);

  Rx = _hexToRgb2[0];
  Gx = _hexToRgb2[1];
  Bx = _hexToRgb2[2];

  var _hexToRgb3 = hexToRgb(endColor);

  var _hexToRgb4 = _slicedToArray(_hexToRgb3, 3);

  Ry = _hexToRgb4[0];
  Gy = _hexToRgb4[1];
  By = _hexToRgb4[2];


  var newColors = [];
  for (var i = 0; i <= n; i++) {
    var r = void 0,
        g = void 0,
        b = void 0;
    var percent = i / n;
    var _ref = [calcColor(Rx, Ry, percent), calcColor(Gx, Gy, percent), calcColor(Bx, By, percent)];
    r = _ref[0];
    g = _ref[1];
    b = _ref[2];


    newColors.push('rgb(' + r + ',' + g + ',' + b + ')');
  }

  return newColors;
};
// function linearGradient(n, ...args) {
//  args.forEach(color => {

//  })
// }

function calcColor(x, y, percent) {
  return x + Math.floor((y - x) * percent);
}
function hexToRgb(hex) {
  var rgb = [];
  hex = hex.substr(1);

  // "#abc" -> "#aabbcc"
  if (hex.length === 3) {
    hex = hex.replace(/(.)/g, '$1$1');
  }
  hex.replace(/../g, function (color) {
    return rgb.push(parseInt(color, 0x10));
  });

  return rgb;
}