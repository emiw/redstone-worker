/* (c) 2015 EMIW, LLC. emiw.xyz/license */
const { src, dest } = require('./config');

const logErrorsHandler = (err) => {
  if (err.message) console.error(err.message);
  if (err.stack) console.error(err.stack);
};

export const logErrors = stream => stream.on('error', logErrorsHandler);

export function negate(paths) {
  if (!Array.isArray(paths)) paths = [paths];
  return paths.map(path => `!${path}`);
};

export function toDest(paths) {
  if (!Array.isArray(paths)) paths = [paths];
  return paths.map(path => path.replace(src, dest));
};

export const noop = () => {};

export function streamToPromise(stream) {
  let isDone = false;
  return new Promise((good, bad) => {
    stream.once('error', (err) => {
      if (isDone) return;
      isDone = true;
      bad(err);
    });

    stream.once('end', () => {
      if (isDone) return;
      isDone = true;
      good(stream);
    });
  });
};
