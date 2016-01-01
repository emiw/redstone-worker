/* (c) 2016 Ari Porad (@ariporad) <http://ariporad.com>. License: ariporad.mit-license.org */
import test from 'ava';
import * as utils from './utils';

test('splitByLength', t => {
  const str = '1122334455';
  t.same(utils.splitByLength(str, 2), ['11', '22', '33', '44', '55']);
});
