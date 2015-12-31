/* (c) 2015 EMIW, LLC. emiw.xyz/license */
import test from 'ava';
import rewire from 'rewire';

const { createRouter } = rewire('./router');

test.beforeEach(t => {
  t.context = createRouter();
});

test.cb('should route to the routes setup with #route', ({ context: router, ...t }) => {
  router.route('foo', () => t.end());
  router.run('foo');
});

test.cb('shouldn\'t call the wrong route', ({ context: router, ...t }) => {
  const wrongRouteHandler = () => t.fail('Wrong route called!');
  router.route('foo', () => t.end());
  router.route('fooo', wrongRouteHandler);
  router.run('foo');
});

test('should throw an error if the route doesn\'t exist', ({ context: router, ...t }) => {
  t.throws(router.run('foo'), /(route|404|not found)/i, 'Nonexistent routes should be problematic');
});

test.cb('should run the routes asynchronously', ({ context: router, ...t }) => {
  let doneWithRunCall = false;
  router.route('foo', () => {
    if (!doneWithRunCall) t.fail('Router was run synchronously!!!');
    t.end();
  });
  router.run('foo');
  doneWithRunCall = true;
});

test.cb('should allow passing any number of arguments to the handler', ({ context: router, ...t }) => {
  const expectedArgs = [[1, 2, 3, 'foo', { bar: 'baz' }], 1, 2, 3, 'foo', { bar: 'baz' }];
  router.route('foo', (...args) => {
    t.same(args, expectedArgs, 'Args should be passed to the handler');
    t.end();
  });
  router.run('foo', ...expectedArgs);
});

test('should return a promise that resolves to the return value of the handler', async ({ context: router, ...t }) => {
  const expectedReturnValue = { a: 'b', bar: [1, 2, 3] };
  router.route('foo', () => expectedReturnValue);
  const actualReturnValue = await router.run('foo');
  t.same(actualReturnValue, expectedReturnValue, 'router#route should resolve to the return value of the handler');
});

test.cb('routes should be case insensitive', ({ context: router, ...t }) => {
  router.route('foo', () => t.end());
  router.run('FOO');
});

test('should throw an error if the routes aren\'t strings', ({ context: router, ...t }) => {
  const routeHandler = () => void 0;
  [
    ['a', 'b', 'c'],
    { 'a': 1, 'b': 2, 'c': 3 },
    1,
    Promise.resolve('foo'),
    new Error('foo'),
  ].forEach((notAString) => {
    t.throws(() => router.route(notAString, routeHandler), TypeError, 'A non-string route should be a TypeError');
    t.throws(router.run(notAString), TypeError, 'A non-string route should be a TypeError');
  });
});
