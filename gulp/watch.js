/* (c) 2015 EMIW, LLC. emiw.xyz/license */
const gulp = require('gulp');
const config = require('./lib/config');

const watch = () => {
  config.mocha.args.push('--reporter', 'min');
  return gulp.watch(config.srcJs, ['test:unit']);
};

gulp.task('watch', ['build'], watch);

module.exports = watch;
