/* (c) 2015-2016 EMIW, LLC. emiw.xyz/license */
import EventEmitter from 'events';
import { dec, END_OF_PACKET } from 'app/util/parse';

export default function createParser() {
  const ee = new EventEmitter(); // TODO: Maybe switch to EventEmitter2?
  let chunk = '';
  return {
    on: ::ee.on,

    addChunk(newChunk) {
      chunk += newChunk;
      const parts = chunk.split(END_OF_PACKET);

      chunk = parts.pop(); // Whatever's left over

      parts.forEach((part) => {
        const result = dec(part + ';');
        ee.emit('fullPacket', result); // TODO: This name is terrible
        if (result.packet) ee.emit('packet', result.packet);
        if (result.ctrl) ee.emit('ctrl', result.ctrl);
      });
    },
  };
}
