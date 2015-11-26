/* (c) 2015 EMIW, LLC. emiw.xyz/license */
const http = require('http');
const socketio = require('socket.io');

// FIXME: Theoretically, since these are async functions, you could call stop,
// then start, and cause problems.
let io
let server;
let started = false;
module.exports = {
  async start(port) {
    if (started) throw new Error('Server already started!');
    server = http.createServer();
    io = socketio(server);
    await Promise.promisify(::server.listen)(port);
    started = true;
    return { io, server };
  },

  async stop() {
    if (!started) throw new Error('Server isn\'t started!');
    await Promise.promisify(::server.close)();
    started = false;
  },
};
