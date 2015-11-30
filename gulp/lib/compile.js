/* (c) 2015 EMIW, LLC. emiw.xyz/license */
const gulp = require('gulp');
const { resolve } = require('path');
const { streamToPromise } = require('./helpers');
const config = require('./config');
const { changed, sourcemaps, babel } = require('./plugins');

module.exports = (src, dest) => {
  const stream = gulp.src(src)
    .pipe(changed(dest))
    .pipe(sourcemaps.init())
    .pipe(babel(config.babel.opts))
    .pipe(sourcemaps.write({ sourceRoot: resolve(__dirname, '..', '..', 'src') }))
    .pipe(gulp.dest(dest));

  return { stream, promise: streamToPromise(stream) };
};


