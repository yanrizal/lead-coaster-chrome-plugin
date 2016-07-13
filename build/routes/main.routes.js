'use strict';

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _controllersFileController = require('../controllers/fileController');

var fileController = _interopRequireWildcard(_controllersFileController);

var _controllersAuthController = require('../controllers/authController');

var authController = _interopRequireWildcard(_controllersAuthController);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var jsonParser = _bodyParser2['default'].json();

module.exports = function (app, passport) {

  app.post('/api/v1/savedata', jsonParser, fileController.saveData);
  app.post('/api/v1/getdata', jsonParser, isAuth, fileController.getData);
  app.post('/api/v1/linkedin/post', jsonParser, fileController.linkedinSave);
  app.post('/api/v1/adddata', jsonParser, fileController.addData);
  app.post('/api/v1/deletedata', jsonParser, fileController.deleteData);
  //auth
  app.post('/login', authController.loginAuth);
  app.post('/signup', authController.signupAuth);
  app.post('/login-chrome', authController.chromeAuth);

  app.get('/', function (req, res) {
    res.render('index', { title: 'index' });
  });

  app.get('/login', function (req, res) {
    res.render('index', { title: 'login' });
  });

  app.get('/signup', function (req, res) {
    res.render('index', { title: 'signup' });
  });

  app.get('/help', isLoggedIn, function (req, res) {
    res.render('index', { title: 'Help' });
  });

  app.get('/result/:id', isLoggedIn, function (req, res) {
    res.render('index', { title: 'Result' });
  });

  app.get('/addcoaster', isLoggedIn, function (req, res) {
    res.render('index', { title: 'Add Coaster' });
  });

  app.get('/coaster/active', isLoggedIn, function (req, res) {
    res.render('index', { title: 'Coaster Active' });
  });

  app.get('/logout', function (req, res) {
    res.clearCookie("token");
    req.logout();
    res.redirect('/');
  });
};

// route middleware to make sure a user is logged in
var isLoggedIn = function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).send({ msg: 'Unauthorized' });
};

var isAuth = function isAuth(req, res, next) {
  var token = req.headers.authorization && req.headers.authorization.split(' ')[1] || req.cookies.token || req.body.token || req.query.token;
  // decode token
  if (token) {
    _jsonwebtoken2['default'].verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
};
//# sourceMappingURL=main.routes.js.map