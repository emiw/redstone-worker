/* (c) 2015 EMIW, LLC. emiw.xyz/license */
import gulp from 'gulp';
import * as config from './lib/config';
import { negate } from './lib/helpers';
import compile from './lib/compile';

gulp.task('default', ['build']);
gulp.task('build', ['clean', 'build:js', 'copy:other']);
gulp.task('build:js', () => {
  return compile(config.srcJs.concat(negate(config.tests)), config.dest).stream;
});

gulp.task('copy:other', function copy() {
  return gulp.src(config.srcOther)
    .pipe(gulp.dest(config.dest));
});
