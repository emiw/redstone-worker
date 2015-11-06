/* (c) 2015 EMIW, LLC. emiw.xyz/license */
/* global expect:false, assert:false */
/* eslint-env mocha */
const rewire = require('rewire');
const { getPort, portAvailable } = require('../test/utils/ports'); // FIXME: App-module-path

describe('app', () => {
  let app;
  beforeEach(() => {
    app = rewire('./app');
  });

  afterEach(async () => {
    try {
      await app.stop();
    } catch (err) {
      // do nothing
    }
  });

  describe('#start', () => {
    it('should start a server on `port`', async () => {
      const port = await getPort();
      await app.start(port);
      await expect(portAvailable(port)).to.eventually.equal(false);
    });
    it('should throw if called more than once', async () => {
      const port = await getPort();
      await app.start(port);
      await expect(app.start(port)).to.be.rejectedWith(/start/i);
    });
  });

  describe('#stop', () => {
    it('should stop the server', async () => {
      const port = await getPort();
      await app.start(port);
      await app.stop();
      await expect(portAvailable(port)).to.eventually.equal(true);
    });
  });
});
