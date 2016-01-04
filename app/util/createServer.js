/* (c) 2015-2016 EMIW, LLC. emiw.xyz/license */
import net from 'net';
import createLock from 'app/util/lock';

export default function createServer(handler) {
  let server;
  let started = false;
  const lock = createLock('Server is already stopping/starting!');
  return {
    get server() {
      return server;
    },
    get started() {
      return started;
    },

    async start(port) {
      if (started) throw new Error('Server already started!');
      lock.lock();

      server = net.createServer(handler);
      await Promise.promisify(::server.listen)(port);

      started = true;
      lock.unlock();
      return server;
    },
    async stop() {
      if (!started) throw new Error('Server isn\'t started!');
      lock.lock();

      await Promise.promisify(::server.close)();

      started = false;
      lock.unlock();
    },
  };
}
