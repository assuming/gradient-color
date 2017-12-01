'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Stupid error collections
 */

var NO_EDN_FRAC = exports.NO_EDN_FRAC = new Error('The last element in the color array should not have a frac field');
var MIN_ARRAY_LENGTH = exports.MIN_ARRAY_LENGTH = new Error('Color array length must > 1');
var FRAC_SUM_ERROR = exports.FRAC_SUM_ERROR = new Error('The sum of the fracs should = 1');
var COLOR_NUMBER_ERROR = exports.COLOR_NUMBER_ERROR = new Error('The number of generated colors should >= the number of color stops');