/* (c) 2015 EMIW, LLC. emiw.xyz/license */
const http = require('http');
const socketio = require('socket.io');

let io, server;
let started = false;
module.exports = {
  start: async (port) => {
    if (started) {
      throw new Error('Server already started!');
    }
    started = true;
    server = http.createServer();
    io = socketio(server);
    await Promise.promisify(::server.listen)(port);
    return { io, server };
  },
};
