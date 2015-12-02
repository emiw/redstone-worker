/* (c) 2015 EMIW, LLC. emiw.xyz/license */
import 'babel/polyfill';
import 'source-map-support/register';
import 'app-module-path/register';

global.Promise = global.Bluebird = require('bluebird');
