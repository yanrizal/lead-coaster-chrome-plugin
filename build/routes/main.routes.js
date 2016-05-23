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

var Linkedin = require('node-linkedin')('app-id', 'secret', 'callback');

// import chalk from 'chalk';

var router = _express2['default'].Router();
var jsonParser = _bodyParser2['default'].json();

router.get('/', function (req, res) {
  res.send('index');
});

router.get('/linkedin', function (req, res) {
  (0, _request2['default'])('', function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log('err');
    }
  });
});

exports['default'] = router;
module.exports = exports['default'];
//# sourceMappingURL=main.routes.js.map