/* (c) 2015 EMIW, LLC. emiw.xyz/license */
import { createServer } from 'http';
import socketio from 'socket.io';

// FIXME: Theoretically, since these are async functions, you could call stop,
// then start, and cause problems.
let io;
let server;
let started = false;

export async function start(port) {
  if (started) throw new Error('Server already started!');
  server = createServer();
  io = socketio(server);
  // This originally used the :: function bind operator, but it is unclear if that's still a thing.
  await Promise.promisify(server.listen.bind(server))(port);
  started = true;
  return { io, server };
}

export async function stop() {
  if (!started) throw new Error('Server isn\'t started!');
  await Promise.promisify(server.close.bind(server))();
  started = false;
}
