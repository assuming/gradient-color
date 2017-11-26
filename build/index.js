'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _errors = require('./errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Generate n colors with given color stops
 *
 * @param   {Array}  colorArray
 * @param   {Number} n          number of colors that need to generate
 * @returns {Array} array of generated colors in rgb mode
 */

function gradient(colorArray, n) {
  var isFullOption = checkParam(colorArray, n);

  // init 2 arrays for algorithm
  var colorList = [];
  var fracList = [];
  // result array for storing data
  var resultArray = [];

  // simple array of color string
  if (!isFullOption) {
    var frac = 1 / (colorArray.length - 1);

    colorArray.forEach(function (colorString, index) {
      if (index !== colorArray.length - 1) {
        colorList.push((0, _color2.default)(colorString));
        fracList.push(frac);
      } else {
        colorList.push((0, _color2.default)(colorString));
      }
    });
  } else {
    colorArray.forEach(function (obj, index) {
      if (index !== colorArray.length - 1) {
        colorList.push((0, _color2.default)(obj.color));
        fracList.push(obj.frac);
      } else {
        if (obj.color) {
          // the last item could be like { color: #ffffff }
          colorList.push((0, _color2.default)(obj.color));
        } else {
          // and it could also be like '#ffffff'
          colorList.push((0, _color2.default)(obj));
        }
      }
    });
  }

  var assignList = assignNumbers(fracList, n);
  resultArray = createGradient(colorList, assignList);

  // convert colors to string version
  resultArray = resultArray.map(function (c) {
    return c.rgb().toString();
  });

  return resultArray;
}

/**
 * Explainations:
 * o -> stop color for gradient
 * * -> generated color
 *
 * o * * * | o * * * * | o * * o -> generated color list in char version
 *    4          5          4    -> assigned number of colors need to be generated
 *
 * The last section, the end color should be considered in the generated colors
 *
 * @returns {Array} array of colors in Color(pkg) format, need toString() call
 */

function createGradient(colorList, assignList) {
  var result = [];

  assignList.forEach(function (num, index) {
    var isLastElement = index === assignList.length - 1;
    var list = [];

    // get end point color
    var start = colorList[index];
    var end = colorList[index + 1];

    // if last element, end color should be in the list,
    // so the num = num - 1
    if (isLastElement) {
      num = num - 1;
    }

    var deltaR = (end.red() - start.red()) / num;
    var deltaG = (end.green() - start.green()) / num;
    var deltaB = (end.blue() - start.blue()) / num;

    // generate num colors
    for (var i = 0; i < num; i++) {
      var R = start.red() + i * deltaR;
      var G = start.green() + i * deltaG;
      var B = start.blue() + i * deltaB;

      list.push(_color2.default.rgb(R, G, B));
    }

    // if last element, end this list with the last color
    if (isLastElement) {
      list.push(end);
    }

    result = result.concat(list);
  });

  return result;
}

/**
 * Calculate and optimize the number of each color period
 *
 * Sometimes frac * N might be a fraction
 * So we use this algorithm:
 *
 * 1. Split the number into 2 parts, each part fits in an array:
 * [2, 4, 1, 5]         -> int array
 * [0.2, 0.5, 0.9, 0.3] -> decimal array
 *
 * The left number should be:
 * left = N - sum(intArray)
 *
 * 2. Sort the decimal array from large to small, assign left to
 * the corresponding element in intArray one by one
 * until left === 0
 *
 * 3. There goes your final array!
 *
 * @returns {Array} array of optimized color numbers
 */

function assignNumbers(fracList, n) {
  var intArray = [];
  var decimalArray = [];

  // assign int part
  fracList.forEach(function (frac, index) {
    var real = frac * n;
    var intPart = Math.floor(real);
    var decimalPart = real - intPart;

    intArray.push(intPart);
    decimalArray.push({
      value: decimalPart,
      index: index
    });
  });

  // how many left ?
  var left = n - intArray.reduce(function (a, b) {
    return a + b;
  }, 0);

  // sort O -> o
  decimalArray.sort(function (a, b) {
    return b.value - a.value;
  });

  // assign the left number regard to the decimal part's value
  // until nothing left
  for (var i = 0; i < left; i++) {
    var targetIndex = decimalArray[i].index;
    intArray[targetIndex] = intArray[targetIndex] + 1;
  }

  return intArray;
}

/**
 * Check param format and throw some errors
 */

function checkParam(array, n) {
  // Seriously? Anyone this dumb?
  if (array.length < 2) {
    throw _errors.MIN_ARRAY_LENGTH;
  }

  // Read the documentation OMG! Of course no frac at the end!
  if (array[array.length - 1].frac) {
    throw _errors.NO_EDN_FRAC;
  }

  // You need to see a doctor, like, right now
  if (n <= array.length) {
    throw _errors.COLOR_NUMBER_ERROR;
  }

  // if full option mode, sum should be 1
  if (typeof array[0] !== 'string') {
    var fracSum = array.slice(0, array.length - 1).reduce(function (a, b) {
      return a + b.frac;
    }, 0);
    if (fracSum < 0.99) {
      throw _errors.FRAC_SUM_ERROR;
    }
  }

  var result = void 0;

  if (typeof array[0] === 'string') {
    result = false;
  } else {
    result = true;
  }

  return result;
}

exports.default = gradient;