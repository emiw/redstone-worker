/* (c) 2015 EMIW, LLC. emiw.xyz/license */

// Using `module.exports` here because we have a ready made object for exporting. Deal with it.
module.exports = require('load-deps')('gulp-*', {
  renameKey: name => name.replace(/^gulp-/, ''),
});
