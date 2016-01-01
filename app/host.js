/* (c) 2016 EMIW, LLC. emiw.xyz/license */
import createParser from './Parser';
import { enc } from './util/parse';
let hostSocket;
let hostParser;
let friendSocket;

const hostWrite = (...args) => hostSocket.write(enc(...args));

export function friend(socket) {
  if (friendSocket) return socket.destroy();
  friendSocket = socket;
  hostWrite({ state: 2 });
  socket.on('data', chunk => hostWrite(null, chunk));
  socket.on('close', () => friendSocket = null);
}

export function host(socket) {
  if (hostSocket) {
    socket.write(enc({ err: 0, state: -1 }));
    return socket.destroy();
  }
  hostParser = createParser();
  hostSocket = socket;
  socket.on('close', () => {
    process.exit();
  });

  hostParser.on('packet', packet => {
    if (friendSocket) friendSocket.write(packet);
  });

  hostWrite({ state: 1 });

  socket.setEncoding('utf8');
  socket.on('data', hostParser.addChunk);
}
