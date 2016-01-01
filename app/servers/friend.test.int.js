/* (c) 2015 EMIW, LLC. emiw.xyz/license */
import test from 'ava';
import rewire from 'rewire';
import { getPort, portAvailable } from 'test/utils/ports';

test.beforeEach(t => {
  t.context.app = rewire('./friend');
});

test.afterEach(t => {
  return t.context.app.stop().catch(() => {});
});


/**
 * Starting
 */
test('#start should start a server on `port`', async t => {
  const port = await getPort();
  await t.context.app.start(port);
  t.false(await portAvailable(port));
});

test('#start should throw if called more than once', async t => {
  const port = await getPort();
  await t.context.app.start(port);
  t.throws(t.context.app.start(port), /start/i, 'should throw if started twice');
});

/**
 * Stoping
 */
test('#stop should stop the server', async t => {
  const port = await getPort();
  await t.context.app.start(port);
  await t.context.app.stop();
  t.true(await portAvailable(port));
});
