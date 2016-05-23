'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

// import chalk from 'chalk';
var clientID = '759dlh2okqws42';
var clientSecret = 'OnnN8xW3X5zecdei';

// var Linkedin = require('node-linkedin')(clientID, clientSecret, 'callback');

var router = _express2['default'].Router();
var jsonParser = _bodyParser2['default'].json();

router.get('/', function (req, res) {
  res.send('index');
});

router.get('/oauth/linkedin', function (req, res) {
  res.send('oauth');
  // Linkedin.auth.authorize(res, scope);
});

exports['default'] = router;
module.exports = exports['default'];
//# sourceMappingURL=main.routes.js.map