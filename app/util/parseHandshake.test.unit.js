/* (c) 2016 EMIW, LLC. emiw.xyz/license */
import test from 'ava';
import parseHandshake from './parseHandshake';

const HANDSHAKE_PACKET = '0f002f096c6f63616c686f73740bb902';

test('parseHandshake', t => {
  const handshake = new Buffer(HANDSHAKE_PACKET, 'hex'); // See /docs/MINECRAFT_HANDSHAKE.md
  const result = parseHandshake(handshake);
  t.is(result.hostname, 'localhost', 'hostname');
  t.is(result.port, 3001, 'port');
  t.is(result.status, false, 'status');
  t.is(result.game, true, 'game');
});

test('throws when handshake isn\'t an Error', t => {
  t.throws(() => parseHandshake(HANDSHAKE_PACKET));
});
