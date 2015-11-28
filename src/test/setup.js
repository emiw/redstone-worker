/* (c) 2015 EMIW, LLC. emiw.xyz/license */
// This is still not ES6 imports because it's not transpiled yet.
/* global expect:false, assert:false */
/* eslint no-var:0, prefer-const:0 */
/* eslint-env mocha */
import chai from 'chai';

require('babel/polyfill');
require('source-map-support/register');

global.Promise = global.Bluebird = require('bluebird');

chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

chai.should();
global.expect = chai.expect;
global.assert = chai.assert;

require('sinomocha')();
