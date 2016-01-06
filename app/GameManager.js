/* (c) 2016 EMIW, LLC. emiw.xyz/license */
import { createStore } from 'redux';
import reducer from 'app/ducks/game';

const games = new Map();

export function normalizeHost(host) {
  return host.toLowerCase().replace('-', '_');
}

export function getGame(host) {
  host = normalizeHost(host);
  if (games.has(host)) return games.get(host);
  const game = createStore(reducer);
  // TODO: Contact dispatcher here.
  games.set(host, game);
  return game;
}

export function endGame(host) {
  games.delete(normalizeHost(host));
}
