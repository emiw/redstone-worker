/* (c) 2015-2016 EMIW, LLC. emiw.xyz/license */
/* eslint no-var: 0, prefer-const: 0 */
var Promise = require('bluebird');
require('babel-core/register');
require('babel-polyfill');
// require('source-map-support/register');
require('app-module-path/register');

global.Promise = global.Bluebird = Promise;

Promise.config({
  warnings: false,
});
