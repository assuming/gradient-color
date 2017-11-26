/**
 * Stupid error collections
 */

export const NO_EDN_FRAC = new Error('The last element in the color array should not have a frac field')
export const MIN_ARRAY_LENGTH = new Error('Color array length must > 1')
export const FRAC_SUM_ERROR = new Error('The sum of the fracs should = 1')
export const COLOR_NUMBER_ERROR = new Error('The number of generated colors should >= the number of color stops')
