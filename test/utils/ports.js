/* (c) 2015-2016 EMIW, LLC. emiw.xyz/license */
import { getPort } from 'portfinder';
import { createServer } from 'net';

module.exports = {
  getPort: Promise.promisify(getPort),

  portAvailable(port) {
    return new Promise((good, bad) => {
      const tester = createServer();
      tester
        .once('error', (err) => {
          if (err.code === 'EADDRINUSE') good(false);
          else bad(err);
        })
        .once('listening', () => {
          tester
            .once('close', () => good(true))
            .close();
        })
        .listen(port);
    });
  },
};
