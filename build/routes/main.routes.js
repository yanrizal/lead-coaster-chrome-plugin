'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _simplecrawler = require('simplecrawler');

var _simplecrawler2 = _interopRequireDefault(_simplecrawler);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _modelsFile = require('../models/file');

// const clientID = '759dlh2okqws42';
// const clientSecret = 'OnnN8xW3X5zecdei';
// const proxy = 'http://101.96.10.30:84';
// const agent = new HttpsProxyAgent(proxy);

// const router = express.Router();
var jsonParser = _bodyParser2['default'].json();

// app/routes.js
module.exports = function (app, passport) {

  app.get('/', function (req, res) {
    var user = req.user ? true : false;
    var email = req.user ? req.user.local.email : '';
    res.render('index', { title: 'index', user: user, email: email });
  });

  // app.post('/post/url', jsonParser, (req, res) => {
  //   const params = {
  //     url: req.body.url
  //   };
  //   console.log(params.url);
  //   const outputFilename = 'tmp/mysearch.json';

  //   fs.writeFile(outputFilename, JSON.stringify(params, null, 4), function(err) {
  //       if(err) {
  //         console.log(err);
  //       } else {
  //         console.log("JSON saved to " + outputFilename);
  //       }
  //   });
  //   res.json(params.url);
  // });

  app.post('/savedata', jsonParser, function (req, res) {
    var params = {
      data: [{
        urlSearch: req.body.urlSearch,
        totalSearch: req.body.totalSearch,
        profileVisit: req.body.dataProfile,
        leadCount: req.body.leadCount,
        dataIndex: req.body.dataIndex,
        searchName: req.body.searchName,
        lastPage: req.body.page
      }],
      meta: {
        username: req.body.lkdUsername
      }
    };
    (0, _modelsFile.saveFile)(params, function (err, response) {
      console.log(response);
      res.json(response);
    });
  });

  app.post('/getdata', jsonParser, function (req, res) {
    var params = {
      username: req.body.lkdUsername
    };
    (0, _modelsFile.findFile)(params, function (err, response) {
      console.log(response);
      res.json(response);
    });
  });

  app.post('/adddata', jsonParser, function (req, res) {
    var params = {
      data: [{
        urlSearch: req.body.urlSearch,
        totalSearch: '0',
        profileVisit: [],
        leadCount: 0,
        dataIndex: 0,
        searchName: req.body.searchName,
        lastPage: 0
      }],
      meta: {
        username: req.body.username
      }
    };
    (0, _modelsFile.addFile)(params, function (err, response) {
      console.log(response);
      res.json(response);
    });
  });

  app.get('/login', function (req, res) {
    var user = req.user ? true : false;
    res.render('index', { title: 'login', user: user });
  });

  // process the login form
  app.post('/login', function (req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
      console.log(err);
      console.log(info);
      console.log(user);
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/login');
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.json({ detail: info });
      });
    })(req, res, next);
  });

  app.post('/login-chrome', function (req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
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
        // const params = {
        //   username: user.local.email
        // }
        // findFile(params, (err, response) => {
        //   console.log(response);
        //   console.log(err);
        //   res.json(response);
        // });
      });
    })(req, res, next);
  });

  app.get('/signup', function (req, res) {
    var user = req.user ? true : false;
    res.render('index', { title: 'signup', user: user });
  });

  app.post('/signup', function (req, res, next) {
    passport.authenticate('local-signup', function (err, user, info) {
      console.log(err);
      console.log(info);
      console.log(user);
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/login');
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.json({ detail: info });
      });
    })(req, res, next);
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

  app.get('/coaster/active', isLoggedIn, function (req, res) {
    console.log(req.user);
    var user = req.user ? true : false;
    var email = req.user ? req.user.local.email : '';
    res.render('index', { title: 'Coaster Active', user: user, email: email });
  });

  app.post('/coaster/api', jsonParser, function (req, res) {
    var params = {
      email: req.body.email
    };
    var obj = undefined;
    var file = 'tmp/data-' + params.email + '.json';
    _fs2['default'].readFile(file, 'utf8', function (err, data) {
      if (err) throw err;
      obj = JSON.parse(data);
      res.json(obj);
    });
  });

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });
};

// route middleware to make sure a user is logged in
var isLoggedIn = function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
};
//# sourceMappingURL=main.routes.js.map