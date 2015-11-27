/* (c) 2015 EMIW, LLC. emiw.   /license */
import gulp from 'gulp';
import * as config from './lib/config';
import { eslint } from './lib/plugins';

export default function lint() {
  return gulp.src(config.srcJs.concat(config.lint.other))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
};

gulp.task('lint', lint);
