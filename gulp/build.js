/* (c) 2015 EMIW, LLC. emiw.xyz/license */
import gulp from 'gulp';
import { join } from 'path';
import * as config from './lib/config';
import { negate } from './lib/helpers';
import compile from './lib/compile';

gulp.task('default', ['build']);
gulp.task('build', ['clean', 'build:js', 'copy:other']);
gulp.task('build:js', ['clean'], () => {
  // This is an array of arrays.
  const dontBuild = [config.tests.all, config.testUtilsSrc, join(config.testUtilsSrc, '**', '*')].map(negate);
  return compile(config.srcJs.concat(...dontBuild), config.dest).stream;
});

gulp.task('copy:other', ['clean'], function copy() {
  return gulp.src(config.srcOther)
    .pipe(gulp.dest(config.dest));
});
