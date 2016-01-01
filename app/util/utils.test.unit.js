/* (c) 2015-2016 EMIW, LLC. emiw.xyz/license */
import test from 'ava';
import * as utils from './utils';

test('splitByLength', t => {
  const str = '1122334455';
  t.same(utils.splitByLength(str, 2), ['11', '22', '33', '44', '55']);
});
