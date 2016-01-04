/* (c) 2016 EMIW, LLC. emiw.xyz/license */
import { Socket } from 'net';
import createParser from './app/Parser';
import { enc } from './app/util/parse';

//export function friend(socket) {
//  if (friendSocket) return socket.destroy();
//  friendSocket = socket;
//  hostWrite({ state: 2 });
//  socket.on('data', chunk => hostWrite(null, chunk));
//  socket.on('close', () => process.exit());
//  hostParser.on('packet', packet => socket.write(packet));
//}
//
//export function host(socket) {
//  if (hostSocket) {
//    socket.write(enc({ err: 0, state: -1 }));
//    return socket.destroy();
//  }
//  hostParser = createParser();
//  hostSocket = socket;
//  socket.on('close', () => {
//    process.exit();
//  });
//
//  hostWrite({ state: 1 });
//
//  socket.setEncoding('utf8');
//  socket.on('data', hostParser.addChunk);
//}

const redstone = new Socket();
const parser = createParser();
const redstoneWrite = (...args) => redstone.write(enc(...args));
let state = 0;
let minecraft = null;
redstone.connect(3000, '127.0.0.1', () => {
  console.log('Connected');
});

redstone.on('close', function() {
  console.log('Connection closed');
  process.exit();
});

redstone.on('data', (data) => {
  //console.log('Received: ' + data);
  parser.addChunk(data);
});

parser.on('packet', packet => {
  if (minecraft) minecraft.write(packet)
});

parser.on('ctrl', (ctrl) => {
  if (ctrl.state !== state) {
    state = ctrl.state;
    switch (ctrl.state) {
      case 1:
        // Connected to server
        break;
      case 2:
        // Friend joined.
        var prom = connectToMinecraft();
        setTimeout(() => {
          console.log('delay done');
          prom.then(() => {
            minecraft.on('data', data => setTimeout(() => redstoneWrite(null, data), 500));
          });
        }, 2000);
        break;
      default:
        throw new Error(`Unexpected State ${state}!`);
    }
  }
});

function connectToMinecraft() {
  return new Promise((good) => {
    minecraft = new Socket();
    minecraft.connect(25565, '127.0.0.1', () => {
      console.log('[MC] Connected');
      good();
    });

    minecraft.on('close', function() {
      console.log('[MC] Connection closed');
      minecraft = null;
      redstoneWrite({ state: 1 });
      state = 1;
    });
  });
}
