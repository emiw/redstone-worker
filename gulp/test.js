/* (c) 2015 EMIW, LLC. emiw.xyz/license */
import gulp from 'gulp';
import compile from './lib/compile';
import { spawn } from 'child_process';
import { resolve } from 'path';
import * as config from './lib/config';
import { negate } from './lib/helpers';

const runMocha = (type) => {
  return new Promise((good, bad) => {
    config.mocha.files = config.tests[type];
    spawn(config.mocha.pathToMocha, config.mocha.opts, {
      cwd: resolve(__dirname, '..'),
      stdio: 'inherit',
      env: config.mocha.env,
    })
      .on('close', code => code === 0 ? good() : bad(new Error('Tests Failed')))
      .on('error', bad);
  });
};

export default function test(type = 'unit') {
  return compile(config.srcJs, config.dest).promise
    .then((arg) => runMocha(type, arg));
};

const testTaskDeps = ['lint'];
const defineTestTask = (name, type) => gulp.task(name, testTaskDeps, () => test(type));

config.tests.types.map(type => defineTestTask(`test:${type}`, type));
defineTestTask('test', 'all');
