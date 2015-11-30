/* (c) 2015 EMIW, LLC. emiw.xyz/license */
/* global expect:false, assert:false */
/* eslint-env mocha */
const rewire = require('rewire');

describe('somethingElse', () => {
  let somethingElse;
  beforeEach(() => {
    somethingElse = rewire('./somethingElse');
  });

  it('should do something', () => {
    somethingElse();
  });
});
