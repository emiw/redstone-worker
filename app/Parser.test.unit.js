/* (c) 2015-2016 EMIW, LLC. emiw.xyz/license */
import test from 'ava';
import { enc } from 'app/util/parse';
import { splitByLength } from 'app/util/utils';
import createParser from './Parser';

test.beforeEach(t => {
  t.context = createParser();
});

test.cb('whole packets', ({ context: parser, ...t}) => {
  t.plan(2);
  const ctrls = [{ foo: 'bar' }, { baz: [1, 'qux'] }, { quux: [1, 2, 3] }];
  const packets = ['foo', 'bar', 'baz'];
  const emitPacket = () => parser.addChunk(enc(ctrls[0], new Buffer(packets[0])));

  parser.on('packet', (packet) => {
    t.is(packet.packet.toString('utf8'), packets.shift(), 'packet matches');
    t.same(packet.ctrl, ctrls.shift(), 'ctrl matches');
  });

  emitPacket();
  emitPacket();
  emitPacket();
});

test.cb('partial packets', ({ context: parser, ...t}) => {
  const ctrls = [{ foo: 'bar' }, { baz: [1, 'qux'] }, { quux: [1, 2, 3] }];
  const packets = ['foo', 'bar', 'baz'];

  parser.on('packet', (packet) => {
    t.is(packet.packet.toString('utf8'), packets.shift(), 'packet matches');
    t.same(packet.ctrl, ctrls.shift(), 'ctrl matches');
  });

  const combinedStr = packets.reduce((str, packet, i) => {
    return str + enc(ctrls[i], new Buffer(packet));
  }, '');

  splitByLength(combinedStr, 10).forEach(parser.addChunk);
});
