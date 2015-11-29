/* (c) 2015 EMIW, LLC. emiw.xyz/license */
/* global expect:false, assert:false */
/* eslint-env mocha */
import createLock from './lock';

describe('util/lock', () => {
  it('should throw when locked twice', () => {
    const lock = createLock('Yay!');
    const doLock = () => lock.lock();
    expect(doLock).to.not.throw();
    expect(doLock).to.throw();
  });

  it('should throw `errorMessage` when locked twice', () => {
    const errorMessage = 'Some really fascinating error message';
    const lock = createLock(errorMessage);
    const doLock = () => lock.lock();
    expect(doLock).to.not.throw();
    expect(doLock).to.throw(errorMessage);
  });

  it('if locked, unlocked, then locked, it shouldn\'t throw', () => {
    const lock = createLock('Hi there!');
    expect(() => {
      lock.lock();
      lock.unlock();
      lock.lock();
    }).to.not.throw();
  });

  it('should do nothing if unlocked twice', () => {
    const lock = createLock('Hello!');
    expect(() => {
      lock.unlock();
      lock.unlock();
    }).to.not.throw();
  });
});
