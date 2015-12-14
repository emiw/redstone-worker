/* (c) 2015 EMIW, LLC. emiw.xyz/license */
/* global expect:false, assert:false */
/* eslint-env mocha */
import createLock from './lock';

describe('util/lock', () => {
  it('should throw when locked twice', () => {
    const lock = createLock('42');
    const doLock = () => lock.lock();
    expect(doLock).to.not.throw();
    expect(doLock).to.throw();
  });

  it('should throw `errorMessage` when locked twice', () => {
    const errorMessage = '42';
    const lock = createLock(errorMessage);
    const doLock = () => lock.lock();
    expect(doLock).to.not.throw();
    expect(doLock).to.throw(errorMessage);
  });

  it('if locked, unlocked, then locked, it shouldn\'t throw', () => {
    const lock = createLock('42');
    expect(() => {
      lock.lock();
      lock.unlock();
      lock.lock();
    }).to.not.throw();
  });

  it('should do nothing if unlocked twice', () => {
    const lock = createLock('42');
    expect(() => {
      lock.unlock();
      lock.unlock();
    }).to.not.throw();
  });

  it('should allow overriding of the error message with the parameter to `lock`', () => {
    // Error messages
    const defaultLockErrorMessage = 'This is the default error message for the lock';
    const singleLockErrorMessage = 'This is the error message for just the individual lock command';

    // Setup
    const lock = createLock(defaultLockErrorMessage);
    lock.lock();

    // The actual test
    expect(() => lock.lock()).to.throw(defaultLockErrorMessage);
    expect(() => lock.lock(singleLockErrorMessage)).to.throw(singleLockErrorMessage);
  });

  it('#lock should return #unlock', () => {
    const lock = createLock('42');
    const unlock = lock.lock();
    expect(lock.unlock).to.eql(unlock);
    unlock();
    expect(() => lock.lock()).to.not.throw();
  });

  it('#lock and #unlock should not use `this`', () => {
    const { lock, unlock } = createLock('42');
    lock();
    expect(() => lock()).to.throw();
    unlock();
    expect(() => lock()).to.not.throw();
  });

  it('#locked should be true if locked, false if otherwise', () => {
    const lock = createLock('42');
    expect(lock.locked).to.equal(false);
    lock.lock();
    expect(lock.locked).to.equal(true);
    lock.unlock();
    expect(lock.locked).to.equal(false);
  });

  it('#unlocked should be false if locked, true if otherwise', () => {
    const lock = createLock('42');
    expect(lock.unlocked).to.equal(true);
    lock.lock();
    expect(lock.unlocked).to.equal(false);
    lock.unlock();
    expect(lock.unlocked).to.equal(true);
  });
});
