/* (c) 2015 EMIW, LLC. emiw.xyz/license */
import { addPath } from 'app-module-path';
import 'babel/polyfill';
import 'source-map-support/register';

// https://github.com/patrick-steele-idem/app-module-path-node/pull/8
addPath(__dirname);

global.Promise = global.Bluebird = require('bluebird');