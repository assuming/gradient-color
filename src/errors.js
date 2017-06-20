/**
 * Stupid error collections
 */

exports.NO_EDN_FRAC = new Error('The last element in the color array should not have a frac field')
exports.MIN_ARRAY_LENGTH = new Error('Color array length must > 1')
exports.FRAC_SUM_ERROR = new Error('The sum of the fracs should = 1')
exports.COLOR_NUMBER_ERROR = new Error('The number of generated colors should >= the number of color stops')