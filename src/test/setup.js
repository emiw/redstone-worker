/* (c) 2015 EMIW, LLC. emiw.xyz/license */
/* global expect:false, assert:false */
/* eslint no-var:0, prefer-const:0 */
/* eslint-env mocha */
import 'babel/polyfill';
import 'source-map-support/register';

import chai from 'chai';
// import sinonChai from 'sinon-chai';
// import sinomocha from 'sinomocha';
import chaiAsPromised from 'chai-as-promised';

global.Promise = global.Bluebird = require('bluebird');

chai.use(chaiAsPromised);

// I got rid of Sinon, because I hadn't used it yet, so add this back in when needed.
// Probobly get rid of sinomocha though, as it uses `this`, and that doesn't work with arrow functions.
// chai.use(sinonChai);
// sinomocha();

chai.should();
global.expect = chai.expect;
global.assert = chai.assert;
