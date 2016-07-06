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

var jsonParser = _bodyParser2['default'].json();

module.exports = function (app, passport) {

  app.post('/api/v1/savedata', jsonParser, fileController.saveData);
  app.post('/api/v1/getdata', jsonParser, isLoggedIn, fileController.getData);
  app.post('/api/v1/linkedin/post', jsonParser, fileController.linkedinSave);
  app.post('/api/v1/adddata', jsonParser, fileController.addData);
  app.post('/api/v1/deletedata', jsonParser, fileController.deleteData);
  //auth
  app.post('/login', authController.loginAuth);
  app.post('/signup', authController.signupAuth);
  app.post('/login-chrome', authController.chromeAuth);

  app.get('/', function (req, res) {
    var user = req.user ? true : false;
    var email = req.user ? req.user.local.email : '';
    res.render('index', { title: 'index', user: user, email: email });
  });

  app.get('/login', function (req, res) {
    var user = req.user ? true : false;
    res.render('index', { title: 'login', user: user });
  });

  app.get('/signup', function (req, res) {
    var user = req.user ? true : false;
    res.render('index', { title: 'signup', user: user });
  });

  app.get('/help', isLoggedIn, function (req, res) {
    console.log(req.user);
    var user = req.user ? true : false;
    var email = req.user ? req.user.local.email : '';
    res.render('index', { title: 'Help', user: user, email: email });
  });

  app.get('/result/:id', isLoggedIn, function (req, res) {
    console.log(req.user);
    var user = req.user ? true : false;
    var email = req.user ? req.user.local.email : '';
    res.render('index', { title: 'Result', user: user, email: email });
  });

  app.get('/addcoaster', isLoggedIn, function (req, res) {
    console.log(req.user);
    var user = req.user ? true : false;
    var email = req.user ? req.user.local.email : '';
    res.render('index', { title: 'Coaster Active', user: user, email: email });
  });

  app.get('/coaster/active', isLoggedIn, function (req, res) {
    console.log(req.user);
    var user = req.user ? true : false;
    var email = req.user ? req.user.local.email : '';
    res.render('index', { title: 'Coaster Active', user: user, email: email });
  });

  app.get('/logout', function (req, res) {
    res.clearCookie("token");
    req.logout();
    res.redirect('/');
  });
};

// route middleware to make sure a user is logged in
var isLoggedIn = function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next();

  // if they aren't redirect them to the home page
  res.status(401).send({ msg: 'Unauthorized' });
};
//# sourceMappingURL=main.routes.js.map