/* (c) 2015 EMIW, LLC. emiw.xyz/license */
/* global expect:false, assert:false */
/* eslint-env mocha */
import rewire from 'rewire';

describe('index', () => {
  let index;
  beforeEach(() => {
    index = rewire('./index');
  });

  it('should do something', () => {
    expect(index).to.not.throw();
  });
});
