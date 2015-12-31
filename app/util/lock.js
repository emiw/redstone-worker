/* (c) 2015 EMIW, LLC. emiw.xyz/license */

export default function createLock(errorMessage) {
  let locked = false;

  const unlock = () => {
    locked = false;
  };

  const lock = (msg = errorMessage) => {
    if (locked) throw new Error(msg);
    locked = true;
    return unlock;
  };

  return {
    lock,
    unlock,
    get locked() {
      return locked;
    },
    get unlocked() {
      return !locked;
    },
  };
}
