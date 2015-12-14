/* (c) 2015 EMIW, LLC. emiw.xyz/license */
require('babel/register');
require('source-map-support/register');
require('app-module-path/register');

global.Promise = global.Bluebird = require('bluebird');
