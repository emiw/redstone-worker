/* (c) 2015 EMIW, LLC. emiw.xyz/license */
const http = require('http');
const socketio = require('socket.io');

// FIXME: Theoretically, since these are async functions, you could call stop,
// then start, and cause problems.
let io, server;
let started = false;
module.exports = {
  start: async (port) => {
    if (started) throw new Error('Server already started!');
    server = http.createServer();
    io = socketio(server);
    await Promise.promisify(::server.listen)(port);
    started = true;
    return { io, server };
  },

  stop: async () => {
    if (!started) throw new Error('Server isn\'t started!');
    await Promise.promisify(::server.close)();
    started = false;
  },
};
