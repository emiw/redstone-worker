/* (c) 2015 EMIW, LLC. emiw.xyz/license */
import gulp from 'gulp';
import _ from 'lodash';
import { spawn } from 'child_process';
import { resolve } from 'path';
import test from './test';
import * as config from './lib/config';

const node_modules = resolve(config.basePath, 'node_modules', '.bin'); // eslint-disable-line
const istanbul = resolve(node_modules, 'istanbul');
const _mocha = resolve(node_modules, '_mocha');

const changeMochaOptions = () => {
  const istanbulArgs = ['cover', ...config.istanbul.args, _mocha, '--'];
  const originalMochaConfig = _.cloneDeep(config.mocha);

  config.mocha.pathToMocha = istanbul;
  config.mocha.args.unshift( ...istanbulArgs);

  return () => config.mocha = originalMochaConfig;
};

export function checkCoverage() {
  return new Promise((good, bad) => {
    const istanbulArgs = _.flatten(Object.keys(config.codeCoverage.thresholds).map((key) => {
      return [`--${key}`, config.codeCoverage.thresholds[key]];
    }));

    spawn(istanbul, ['check-coverage', ...istanbulArgs], { cwd: config.basePath, stdio: 'inherit' })
      .on('close', code => code === 0 ? good() : bad('Code Coverage Failed'))
      .on('error', bad);
  });
};


export default function testCov(type = 'unit'){
  const revertMochaOptions = changeMochaOptions();
  return test(type)
    .finally(revertMochaOptions)
    .then(checkCoverage);
};

const defineTestCovTask = (name, type) => gulp.task(name, () => testCov(type));

config.tests.types.map(type => defineTestCovTask(`test:${type}:cov`, type));
defineTestCovTask('test:cov', 'all');
