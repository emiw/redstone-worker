const getPort = require('portfinder').getPort;
const net = require('net');

module.exports = {
  getPort: Promise.promisify(getPort),

  portAvailable: function portAvailable(port) {
    return new Promise(function promiseWrapper(good, bad) {
      const tester = net.createServer();
      tester
        .once('error', function onError(err) {
          if (err.code === 'EADDRINUSE') good(false);
          else bad(err);
        })
        .once('listening', function onListening() {
          tester
            .once('close', function onClose() {
              good(true);
            })
            .close();
        })
        .listen(port);
    });
  },
};
