/* (c) 2015 EMIW, LLC. emiw.xyz/license */
/* global expect:false, assert:false */
/* eslint no-var:0, prefer-const:0 */
/* eslint-env mocha */
var chai = require('chai');

require('babel-polyfill');
require('source-map-support/register');

global.Promise = global.Bluebird = require('bluebird');

chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

chai.should();
global.expect = chai.expect;
global.assert = chai.assert;

require('sinomocha')();
