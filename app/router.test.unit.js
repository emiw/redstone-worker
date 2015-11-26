/* (c) 2015 EMIW, LLC. emiw.xyz/license */
/* global expect:false, assert:false */
/* eslint-env mocha */
const rewire = require('rewire');

describe('router', () => {
  const createRouter = rewire('./router');
  let router;

  beforeEach(() => {
    router = createRouter();
  });

  describe('#run', () => {
    it('should route to the routes setup with #route', (cb) => {
      router.route('foo', () => cb());
      router.run('foo');
    });

    it('shouldn\'t call the wrong route', (cb) => {
      const wrongRouteHandler = () => cb(new Error('Wrong route called!'));
      router.route('foo', () => cb());
      router.route('fooo', wrongRouteHandler);
      router.run('foo');
    });

    it('should throw an error if the route doesn\'t exist', async () => {
      await expect(router.run('foo')).to.be.rejectedWith(/(route|404|not found)/i);
    });

    it('should run the routes asyncronously', (cb) => {
      let doneWithRunCall = false;
      router.route('foo', () => {
        if (!doneWithRunCall) cb(new Error('Router was run syncronously!!!'));
        else cb();
      });
      router.run('foo');
      doneWithRunCall = true;
    });

    it('should allow passing any number of arguments to the handler', (cb) => {
      const expectedArgs = [[1, 2, 3, 'foo', { bar: 'baz' }], 1, 2, 3, 'foo', { bar: 'baz' }];
      router.route('foo', (...args) => {
        expect(args).to.deep.equal(expectedArgs);
        cb();
      });
      router.run('foo', ...expectedArgs);
    });

    it('should return a promise that reslolves to the return value of the handler', async () => {
      const expectedReturnValue = { a: 'b', bar: [1, 2, 3] };
      router.route('foo', () => expectedReturnValue);
      await expect(router.run('foo')).to.eventually.equal(expectedReturnValue);
    });

    it('routes should be case insensitive', (cb) => {
      router.route('foo', cb);
      router.run('FOO');
    });

    it('should throw an error if the routes aren\'t strings', () => {
      const routeHandler = () => void 0;
      const notStrings = [
        ['a', 'b', 'c'],
        { 'a': 1, 'b': 2, 'c': 3 },
        1,
        Promise.resolve('foo'),
        new Error('foo'),
      ];

      const promises = [];

      notStrings.forEach((notAString) => {
        expect(() => router.route(notAString, routeHandler)).to.throw(TypeError);
        promises.push(expect(router.run(notAString)).to.be.rejectedWith(TypeError));
      });

      return Promise.all(promises);
    });
  });
});
