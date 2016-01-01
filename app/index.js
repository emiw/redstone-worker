/* (c) 2015-2016 EMIW, LLC. emiw.xyz/license */
/* eslint no-var:0 prefer-const:0 */
// No ES6 in this file
require('../setup');

var handlers = require('./host');
var createServer = require('./util/createServer').default;

var host = createServer(handlers.host);
var friend = createServer(handlers.friend);

host.start(3000)
  .then(friend.start(3001))
  .then(() => console.log('ready'));
