/* (c) 2015 EMIW, LLC. emiw.xyz/license */
import gulp from 'gulp';
import * as config from './lib/config';
import del from 'del';

export default function clean() {
   return del([config.dest].concat(config.clean.other))
};

gulp.task('clean', clean);
