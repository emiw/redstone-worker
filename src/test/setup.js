/* (c) 2015 EMIW, LLC. emiw.xyz/license */
/* global expect:false, assert:false */
/* eslint no-var:0, prefer-const:0 */
/* eslint-env mocha */
import 'babel/polyfill';
import 'source-map-support/register';

import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import sinomocha from 'sinomocha';

global.Promise = global.Bluebird = require('bluebird');

chai.use(sinonChai);
chai.use(chaiAsPromised);

chai.should();
global.expect = chai.expect;
global.assert = chai.assert;

sinomocha();
