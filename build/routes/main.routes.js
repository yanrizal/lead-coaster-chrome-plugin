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

// const clientID = '759dlh2okqws42';
// const clientSecret = 'OnnN8xW3X5zecdei';
// const proxy = 'http://101.96.10.30:84';
// const agent = new HttpsProxyAgent(proxy);

// const router = express.Router();
// const jsonParser = bodyParser.json();

// router.get('/', (req, res) => {
//   res.render('index', { title: 'index' });
// });

// router.get('/login', (req, res) => {
//   res.render('index', { title: 'Login' });
// });

// router.get('/signup', (req, res) => {
//   res.render('index', { title: 'Signup' });
// });

// router.get('/help', isLoggedIn, (req, res) => {
//   res.render('index', { title: 'Help' });
// });

// router.post('/post/url', jsonParser, (req, res) => {
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

// // process the signup form
// router.post('/signup-submit', function(req, res, next) {
//     passport.authenticate('local-signup', function(err, user, info) {
//         console.log(err);
//         if (err) { return next(err); }
//         if (!user) { return res.render('account'); }
//         req.logIn(user, function(err) {
//             if (err) { return next(err); }
//             return res.json({detail: info});
//         });
//     })(req, res, next);
// });

// // route middleware to make sure a user is logged in
// function isLoggedIn(req, res, next) {

//     // if user is authenticated in the session, carry on
//     if (req.isAuthenticated())
//         return next();

//     // if they aren't redirect them to the home page
//     res.redirect('/');
// }

// app/routes.js
module.exports = function (app, passport) {

    app.get('/', function (req, res) {
        var user = req.user ? true : false;
        res.render('index', { title: 'index', user: user });
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
        res.render('index', { title: 'Help', user: user });
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

/*router.get('/crawler', (req, res) => {
   var request2 = request.defaults({jar: true})
    request2('http://www.linkedin.com', function (error, response, body) {
      //console.log(body);

      const $ = cheerio.load(body);
      const csrf = $('#loginCsrfParam-login').val();
      console.log(csrf);
      console.log(response.headers["set-cookie"]);
      var dataCookie = mkdataCookie('MC_STORE_ID=66860; expires=' + new Date(new Date().getTime() + 86409000));
      var form = {
          session_key: 'yanuarrizal89@gmail.com',
          session_password: '',
          isJsEnabled: 'false',
          loginCsrfParam: csrf,
          sourceAlias:'0_7r5yezRXCiA_H0CRD8sf6DhOjTKUNps5xGTqeX8EEoi'
      };

      var formData = querystring.stringify(form);
      var contentLength = formData.length;
      const urlLogin = 'https://www.linkedin.com/uas/login-submit';
      request({
          headers: {
            'Content-Length': contentLength,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': dataCookieToString(dataCookie)
          },
          uri: urlLogin,
          body: formData,
          method: 'POST'
        }, function (err, res, body) {
          //it works!
          console.log(body);
          var wstream = fs.createWriteStream('myOutput.txt');
          wstream.write(body);
          wstream.end();
        });
    });
});

function dataCookieToString(dataCookie) {
    var t = "";
    for (var x = 0; x < dataCookie.length; x++) {
        t += ((t != "") ? "; " : "") + dataCookie[x].key + "=" + dataCookie[x].value;
    }
    return t;
}

function mkdataCookie(cookie) {
    var t, j;
    cookie = cookie.toString().replace(/,([^ ])/g, ",[12],$1").split(",[12],");
    for (var x = 0; x < cookie.length; x++) {
        cookie[x] = cookie[x].split("; ");
        j = cookie[x][0].split("=");
        t = {
            key: j[0],
            value: j[1]
        };
        for (var i = 1; i < cookie[x].length; i++) {
            j = cookie[x][i].split("=");
            t[j[0]] = j[1];
        }
        cookie[x] = t;
    }

    return cookie;
}*/

// export default router;
//# sourceMappingURL=main.routes.js.map