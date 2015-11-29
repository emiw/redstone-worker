/* (c) 2015 EMIW, LLC. emiw.xyz/license */

export default function createLock(errorMessage) {
  let locked = false;

  function unlock() {
    locked = false;
  }

  function lock() {
    if (locked) throw new Error(errorMessage);
    locked = true;
    return unlock;
  }

  return { lock, unlock };
}
