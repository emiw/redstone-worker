/* (c) 2015 EMIW, LLC. emiw.xyz/license */
function filterPath(path) {
  if (typeof path !== 'string') throw new TypeError('Path must be a string!');
  return path.trim().toLowerCase();
}

const nextEventLoopTick = () => new Promise(good => setImmediate(good));

function Router() {
  const routes = new Map();
  return {
    is: Router,
    route(path, handler) {
      path = filterPath(path);
      routes.set(path, handler);
    },

    async run(path, ...args) {
      path = filterPath(path);
      await nextEventLoopTick();
      const handler = routes.get(path);
      if (!handler) throw new Error('Route not found!');
      // This prevents the returned promise from resolving to another promise
      return await Promise.resolve(handler(...args));
    }
  }
}

module.exports = Router;
