/* (c) 2015-2016 EMIW, LLC. emiw.xyz/license */
import test from 'ava';
import net from 'net';
import createServer from './createServer';
import { getPort, portAvailable } from 'test/utils/ports';

const noop = () => {};

function cleanup(server) {
  return server.stop().catch(noop);
}

test.beforeEach(async t => {
  t.context.port = await getPort();
});

/**
 * Handler
 */
// https://gist.github.com/tedmiston/5935757
test.cb('`handler` is called when a connection is made', ({ context: ctx, ...t }) => {
  const server = createServer((socket) => {
    t.pass();
    socket.write('hi');
  });

  server.start(ctx.port)
    .then(() => {
      const client = new net.Socket();
      client.connect(ctx.port, '127.0.0.1', () => {
        t.pass();
      });

      client.setEncoding('utf8');

      client.on('data', (data) => {
        t.is(data, 'hi');
        client.destroy(); // kill client after server's response
      });

      client.on('close', () => cleanup(server).then(t.end()));
    });
});

/**
 * Starting
 */
test('#start should start a server on `port`', async ({ context: ctx, ...t }) => {
  const server = createServer(noop);
  await server.start(ctx.port);
  t.false(await portAvailable(ctx.port));
  await cleanup(server);
});

test('#start should throw if called more than once', async ({ context: ctx, ...t }) => {
  const server = createServer(noop);
  await server.start(ctx.port);
  t.throws(server.start(ctx.port), /start/i, 'should throw if started twice');
  await cleanup(server);
});

/**
 * Stoping
 */
test('#stop should stop the server', async ({ context: ctx, ...t }) => {
  const server = createServer(noop);
  await server.start(ctx.port);
  await server.stop();
  t.true(await portAvailable(ctx.port));
  await cleanup(server);
});

test('#stop should throw if the server hasn\'t been started', async t => {
  const server = createServer(noop);
  t.throws(server.stop(), /start/);
  await cleanup(server);
});

test('#stop should throw if called twice', async ({ context: ctx, ...t }) => {
  const server = createServer(noop);
  await server.start(ctx.port);
  await server.stop();
  t.throws(server.stop(), /start/);
  await cleanup(server);
});
