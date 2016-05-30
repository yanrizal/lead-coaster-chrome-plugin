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

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

// import chalk from 'chalk';
var clientID = '759dlh2okqws42';
var clientSecret = 'OnnN8xW3X5zecdei';

// var Linkedin = require('node-linkedin')(clientID, clientSecret, 'callback');
var router = _express2['default'].Router();
var jsonParser = _bodyParser2['default'].json();

router.get('/', function (req, res) {
  res.render('index', { title: 'nice' });
});

// router.get('/oauth/linkedin', (req, res) => {
//   res.send('oauth');
//   // Linkedin.auth.authorize(res, scope);
// });

router.post('/post/url', jsonParser, function (req, res) {
  var params = {
    url: req.body.url
  };
  console.log(params.url);
  res.json(params.url);
});

router.get('/scrape/profile', function (req, res) {
  var url = 'https://www.linkedin.com/in/rizky-kusumo-b9ab4116';

  (0, _request2['default'])(url, function (error, response, html) {
    if (!error) {
      var $ = _cheerio2['default'].load(html);
      var headline = $('#summary .description').text();
      console.log(headline);
    }
    res.send('scrape');
  });
});

exports['default'] = router;
module.exports = exports['default'];
//# sourceMappingURL=main.routes.js.map