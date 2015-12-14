/* (c) 2015 EMIW, LLC. emiw.xyz/license */
/* global expect:false, assert:false */
import '../setup';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

// I got rid of Sinon, because I hadn't used it yet, so add this back in when needed.
// Probobly get rid of sinomocha though, as it uses `this`, and that doesn't work with arrow functions.
// import sinonChai from 'sinon-chai';
// import sinomocha from 'sinomocha';
// chai.use(sinonChai);
// sinomocha();

chai.should();
global.expect = chai.expect;
global.assert = chai.assert;
