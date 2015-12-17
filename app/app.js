/* (c) 2015 EMIW, LLC. emiw.xyz/license */
import { createServer } from 'http';
import socketio from 'socket.io';
import createLock from 'app/util/lock';

let io;
let server;
let started = false;
const lock = createLock('Server is already stopping/starting!');
export async function start(port) {
  if (started) throw new Error('Server already started!');
  lock.lock();

  server = createServer();
  io = socketio(server);
  // This originally used the :: function bind operator, but it is unclear if that's still a thing.
  await Promise.promisify(server.listen.bind(server))(port);

  started = true;
  lock.unlock();
  return { io, server };
}

export async function stop() {
  if (!started) throw new Error('Server isn\'t started!');
  lock.lock();

  await Promise.promisify(server.close.bind(server))();

  started = false;
  lock.unlock();
}
