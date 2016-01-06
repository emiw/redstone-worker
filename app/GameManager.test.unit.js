/* (c) 2016 EMIW, LLC. emiw.xyz/license */
import test from 'ava';
import { getGame, endGame } from './GameManager';

test('Create game on demand', t => {
  t.ok(getGame('foo'));
});

test('Game is a redux store', t => {
  const store = getGame('bar');
  t.is(typeof store.getState, 'function');
  t.is(typeof store.dispatch, 'function');
  t.is(typeof store.subscribe, 'function');
  t.is(typeof store.replaceReducer, 'function');
});

test('Games are persisted', t => {
  const store = getGame('baz');
  store.replaceReducer((state = { payload: null }, action) => action.type === 'foo' ? { payload: action.payload } : state);
  store.dispatch({ type: 'foo', payload: 'foo bar baz' });
  t.same(store.getState(), { payload: 'foo bar baz'}, 'dispatch works');

  const store2 = getGame('baz');
  t.same(store2.getState(), { payload: 'foo bar baz'}, 'state is persisted');
});

test('endGame removes a game', t => {
  const store = getGame('qux');
  store.foo = 'bar';

  endGame('qux');

  const store2 = getGame('qux');
  t.is(typeof store2.foo, 'undefined');
});
