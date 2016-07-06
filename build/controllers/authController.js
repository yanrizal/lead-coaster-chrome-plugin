'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var loginAuth = function loginAuth(req, res, next) {
  _passport2['default'].authenticate('local-login', function (err, user, info) {
    console.log('error : ', err);
    console.log('info : ', info);
    console.log('user : ', user);
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
      //return res.redirect('/login');
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.json({
        token: genToken(user),
        username: user.local.email
      });
    });
  })(req, res, next);
};

exports.loginAuth = loginAuth;
var signupAuth = function signupAuth(req, res, next) {
  _passport2['default'].authenticate('local-signup', function (err, user, info) {
    console.log(err);
    console.log(info);
    console.log(user);
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Signup Failed"
      });
      return;
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.json(genToken(user));
    });
  })(req, res, next);
};

exports.signupAuth = signupAuth;
var chromeAuth = function chromeAuth(req, res, next) {
  _passport2['default'].authenticate('local-login', function (err, user, info) {
    console.log(err);
    console.log(info);
    console.log(user);
    if (err) {
      return next(err);
    }
    if (!user) {
      res.json({
        login: 'failed'
      });
      return false;
    }
    req.logIn(user, function (err) {
      console.log('user', user.local.email);
      if (err) {
        return next(err);
      }
      return res.json({
        login: 'success'
      });
    });
  })(req, res, next);
};

exports.chromeAuth = chromeAuth;
// private method
var genToken = function genToken(user) {
  var payload = {
    iss: 'my.domain.com',
    sub: user.id,
    iat: (0, _moment2['default'])().unix(),
    exp: (0, _moment2['default'])().add(1, 'days').unix()
  };
  return _jsonwebtoken2['default'].sign(payload, process.env.TOKEN_SECRET);
};
//# sourceMappingURL=authController.js.map