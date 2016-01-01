/* (c) 2015-2016 EMIW, LLC. emiw.xyz/license */
import test from 'ava';
import { enc, dec } from './parse';

test('dec(enc(null, x)).packet === x', t => {
  const packet = new Buffer('foo bar baz');
  const encd = enc(null, packet);
  const decd = dec(encd);
  t.same(decd.packet, packet, 'dec(enc(null, x)).packet === x');
});

test('dec(enc(x, ...)).ctrl === x', t => {
  const ctrl = { foo: ['bar:', 'baz;'], qux: true};
  const encd = enc(ctrl);
  const decd = dec(encd);
  t.same(decd.ctrl, ctrl, 'dec(enc(x, ...)).ctrl === x');
});

test('dec(enc(x, y)) === { ctrl: x, packet: y }', t => {
  const ctrl = { foo: ['bar:', 'baz;'], qux: true};
  const packet = new Buffer('foo bar baz');
  const encd = enc(ctrl, packet);
  const decd = dec(encd);
  t.same(decd.ctrl, ctrl, 'dec(enc(x, y)).ctrl === x');
  t.same(decd.packet, packet, 'dec(enc(x, y)).packet === y');
});

test('dec(enc(\'\', \'\'))', t => {
  const encd = enc('', new Buffer(''));
  const decd = dec(encd);
  t.same(decd.ctrl, '');
  t.same(decd.packet, new Buffer(''));
});

test('invalid decoding', t => {
  const testDecode = decodee => t.throws(() => dec(decodee));
  testDecode('foo');
  testDecode('');
  testDecode({ foo: 'bar' });
});

test('invalid encoding (packet not a Buffer)', t => {
  const testEncode = encodee => t.throws(() => enc(null, encodee));
  testEncode('foo');
  testEncode({ foo: 'bar' });
  testEncode('');
});
