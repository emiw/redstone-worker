/* (c) 2015 EMIW, LLC. emiw.xyz/license */
import { createServer } from 'net';
import createLock from 'app/util/lock';

let server;
let started = false;
const lock = createLock('Server is already stopping/starting!');
export async function start(port) {
  if (started) throw new Error('Server already started!');
  lock.lock();

  server = createServer(/* TODO */);
  await Promise.promisify(::server.listen)(port);

  started = true;
  lock.unlock();
  return server;
}

export async function stop() {
  if (!started) throw new Error('Server isn\'t started!');
  lock.lock();

  await Promise.promisify(::server.close)();

  started = false;
  lock.unlock();
}
