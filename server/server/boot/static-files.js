'use strict';

var path = require('path');

module.exports = function(server) {
  var loopback = require('loopback');
  server.use(loopback.static(path.join(__dirname, '../../public')));
};
