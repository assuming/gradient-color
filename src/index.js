const Color = require('color')
const {
  NO_EDN_FRAC,
  MIN_ARRAY_LENGTH,
  FRAC_SUM_ERROR,
  COLOR_NUMBER_ERROR
} = require('./errors')

/**
 * Generate n colors with given color stops
 * 
 * @param   {Array}  colorArray 
 * @param   {Number} n          number of colors that need to generate 
 * @returns {Array} array of generated colors in rgb mode
 */

function gradient(colorArray, n) {
  const isFullOption = checkParam(colorArray, n)

  // init 2 arrays for algorithm
  let colorList = []
  let fracList = []
  // result array for storing data
  let resultArray = []

  // simple array of color string
  if (!isFullOption) {
    const frac = 1 / (colorArray.length - 1)

    colorArray.forEach((colorString, index) => {
      if (index !== (colorArray.length - 1)) {
        colorList.push(Color(colorString))
        fracList.push(frac)
      } else {
        colorList.push(Color(colorString))
      }
    })
  } else {
    colorArray.forEach((obj, index) => {
      if (index !== (colorArray.length - 1)) {
        colorList.push(Color(obj.color))
        fracList.push(obj.frac)
      } else {
        if (obj.color) {
          // the last item could be like { color: #ffffff }
          colorList.push(Color(obj.color))
        } else {
          // and it could also be like '#ffffff'
          colorList.push(Color(obj))
        }
      }
    })
  }

  const assignList = assignNumbers(fracList, n)
  resultArray = createGradient(colorList, assignList)

  // convert colors to string version
  resultArray = resultArray.map(c => c.rgb().toString())

  return resultArray
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
  let result = []

  assignList.forEach((num, index) => {
    const isLastElement = index === assignList.length - 1
    const list = []

    // get end point color
    const start = colorList[index]
    const end = colorList[index + 1]

    // if last element, end color should be in the list,
    // so the num = num - 1
    if (isLastElement) {
      num = num - 1
    }

    const deltaR = (end.red() - start.red()) / num
    const deltaG = (end.green() - start.green()) / num
    const deltaB = (end.blue() - start.blue()) / num
    
    // generate num colors
    for (let i = 0; i < num; i++) {
      const R = start.red() + i * deltaR
      const G = start.green() + i * deltaG
      const B = start.blue() + i * deltaB
      
      list.push(Color.rgb(R, G, B))
    }

    // if last element, end this list with the last color
    if (isLastElement) {
      list.push(end)
    }
    
    result = result.concat(list)
  })

  return result
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
  const intArray = []
  const decimalArray = []

  // assign int part
  fracList.forEach((frac, index) => {
    const real = frac * n
    const intPart = Math.floor(real)
    const decimalPart = real - intPart

    intArray.push(intPart)
    decimalArray.push({
      value: decimalPart,
      index: index
    })
  })

  // how many left ?
  const left = n - intArray.reduce((a, b) => a + b, 0)

  // sort O -> o
  decimalArray.sort((a, b) => b.value - a.value)
  
  // assign the left number regard to the decimal part's value
  // until nothing left
  for (let i = 0; i < left; i++) {
    const targetIndex = decimalArray[i].index
    intArray[targetIndex] = intArray[targetIndex] + 1 
  }

  return intArray
}

/**
 * Check param format and throw some errors
 */

function checkParam(array, n) {
  // Seriously? Anyone this dumb?
  if (array.length < 2) {
    throw MIN_ARRAY_LENGTH
  }

  // Read the documentation OMG! Of course no frac at the end!
  if (array[array.length - 1].frac) {
    throw NO_EDN_FRAC
  }

  // You need to see a doctor, like, right now
  if (n <= array.length) {
    throw COLOR_NUMBER_ERROR
  }

  // if full option mode, sum should be 1
  if (typeof array[0] !== 'string') {
    const fracSum = array
                      .slice(0, array.length - 1)
                      .reduce((a, b) => a + b.frac, 0)
    if (fracSum < 0.99) {
      throw FRAC_SUM_ERROR
    }
  }

  let result

  if (typeof array[0] === 'string') {
    result = false
  } else {
    result = true
  }

  return result
}

module.exports = gradient
