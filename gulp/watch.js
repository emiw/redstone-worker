/* (c) 2015 EMIW, LLC. emiw.xyz/license */
import gulp from 'gulp';
import * as config from './lib/config';

export default function watch() {
  config.mocha.args.push('--reporter', 'min');
  return gulp.watch(config.srcJs, ['test:unit']);
};

gulp.task('watch', ['build'], watch);
