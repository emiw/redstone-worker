/* (c) 2015-2016 EMIW, LLC. emiw.xyz/license */
import test from 'ava';
import createLock from './lock';

test.beforeEach(t => {
  t.context = createLock('42');
});

test('throws when locked twice', t => {
  const doLock = () => t.context.lock();
  // We need `null` here, because the string is the reason, not the expected value
  t.doesNotThrow(doLock, null, 'doesn\'t throw the first time you lock it');
  t.throws(doLock, null, 'does throw the second time you lock it');
});

test('throws `errorMessage` when locked twice', t => {
  const doLock = () => t.context.lock();
  t.doesNotThrow(doLock, 'doesn\'t throw the first time you lock it');
  t.throws(doLock, '42', 'throws the proper error message the second time');
});

test('if locked, unlocked, then locked, it shouldn\'t throw', t => {
  t.doesNotThrow(() => {
    t.context.lock();
    t.context.unlock();
    t.context.lock();
  });
});

test('should do nothing if unlocked twice', t => {
  t.doesNotThrow(() => {
    t.context.unlock();
    t.context.unlock();
  });
});

test('should allow overriding of the error message with the parameter to `lock`', t => {
  // Setup
  t.context.lock();

  // The actual test
  t.throws(::t.context.lock, '42');
  t.throws(() => t.context.lock('6x9'), '6x9');
});

test('#lock should return #unlock', t => {
  const unlock = t.context.lock();
  t.same(t.context.unlock, unlock, 'return value of #lock is #unlock');
  unlock();
  t.doesNotThrow(::t.context.lock, 'the returned function works properly');
});

test('#lock and #unlock should not use `this`', t => {
  const { lock, unlock } = t.context;
  lock();
  t.throws(lock, null, 'state is kept after locking without `this`'); // See above for `null` explanation
  unlock();
  t.doesNotThrow(lock, null, 'state is kept after unlocking without `this`');
});

test('#locked should be true if locked, false if otherwise', t => {
  t.false(t.context.locked);
  t.context.lock();
  t.true(t.context.locked);
  t.context.unlock();
  t.false(t.context.locked);
});

test('#unlocked should be false if locked, true if otherwise', t => {
  t.true(t.context.unlocked);
  t.context.lock();
  t.false(t.context.unlocked);
  t.context.unlock();
  t.true(t.context.unlocked);
});
