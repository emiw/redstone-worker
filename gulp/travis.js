/* (c) 2015 EMIW, LLC. emiw.xyz/license */
import gulp from 'gulp';
import { exec } from 'child_process';
import { resolve } from 'path';
import { basePath } from './lib/config';
import testCov from './test-cov';

const lcov = resolve(basePath, 'coverage', 'lcov.info');
const coveralls = resolve(basePath, 'node_modules', 'coveralls', 'bin', 'coveralls.js');
const coverageUploadCommand = `cat ${lcov} | ${coveralls} -v; echo "Coverage Uploaded"`;

export function uploadCoverage() {
  // Only upload coverage once
  if ((process.env.TRAVIS_JOB_NUMBER || '0.1').split('.').pop() !== '1') return Promise.resolve();

  return new Promise((good, /* bad */) => {
    exec(coverageUploadCommand, (err, stdout, stderr) => {
      console.log(stdout);
      console.error(stderr);
      console.error(err);
      good();
    });
  });
};

export default function travis() {
  return testCov(process.env.TEST_TYPES || 'all')
    .finally(uploadCoverage);
};

gulp.task('travis', ['lint'], travis);
