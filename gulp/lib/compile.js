/* (c) 2015 EMIW, LLC. emiw.xyz/license */
import gulp from 'gulp';
import { resolve } from 'path';
import { streamToPromise } from './helpers';
import * as config from './config';
import { changed, sourcemaps, babel } from './plugins';

export default function compile(src, dest) {
  const stream = gulp.src(src)
    .pipe(changed(dest))
    .pipe(sourcemaps.init())
    .pipe(babel(config.babel.opts))
    .pipe(sourcemaps.write({ sourceRoot: resolve(__dirname, '..', '..', 'src') }))
    .pipe(gulp.dest(dest));

  return { stream, promise: streamToPromise(stream) };
};
