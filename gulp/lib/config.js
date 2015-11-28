/* (c) 2015 EMIW, LLC. emiw.xyz/license */
import { resolve, join, basename } from 'path';

export const basePath = resolve(__dirname, '..', '..');
const pathInBase = (...paths) => resolve(basePath, ...paths);

export const src = pathInBase('src');
export const dest = pathInBase('build');
export const spikes = pathInBase('spikes');
export const app = 'app';
export const appSrc = join(src, app);
export const appDest = join(dest, app);
export const testUtils = 'test';
export const testUtilsSrc = join(src, testUtils);
export const testUtilsDest = join(dest, testUtils);

export const srcJs = [join(src, '**', '*.js')];
export const srcOther = [join(src, '**'), '!**/*.js'];

export const lint = {
  other: [resolve(__dirname, '..'), join(spikes, '**', '*.js')],
};

export const clean = {
  other: [pathInBase('coverage')],
};

export const tests = {
  // The rest is auto generated later, for maximum DRYness, using the path `$src/**/*.test.${type}.js`
  types: ['unit', 'int', 'all'],
};
tests.types.forEach(type => tests[type] = join(appSrc, '**', `*.test.${type}.js`));
// We have to override this here, because we don't want the path to be `$src/**/*.test.all.js`
tests.all = join(appSrc, '**', '*.test.*.js');


export const codeCoverage = {
  thresholds: {
    statements: 90,
    functions: 90,
    branches: 90,
    lines: 90,
  },
};

export const mocha = {
  // Because of child_process.spawn nonsense, we have to specify the option name and value as seperate strings.
  args: [
    '--require', join(testUtilsDest, 'setup.js'),
  ],

  files: tests.all,

  get opts() {
    return mocha.args.concat([mocha.files.replace(src, dest)]);
  },

  pathToMocha: resolve(__dirname, '..', '..', 'node_modules', '.bin', 'mocha'),

  env: Object.assign({}, process.env, {
    NODE_ENV: 'test',
  }),
};

export const istanbul = {
  // Because of child_process.spawn nonsense, we have to specify the option name and value as seperate strings.
  args: [
    // These are only passed to `istanbul cover`. `cover _mocha --` is automatically inseted.
    '-x', join('**', basename(tests.all)),
    '-x', join(testUtilsDest, '**', '*'),
  ],
};

export const babel = {
  opts: {
    babelrc: pathInBase('.babelrc'),
  },
};
