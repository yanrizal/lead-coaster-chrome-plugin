'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _routesMainRoutes = require('./routes/main.routes');

var _routesMainRoutes2 = _interopRequireDefault(_routesMainRoutes);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _connectFlash = require('connect-flash');

var _connectFlash2 = _interopRequireDefault(_connectFlash);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _configDatabase = require('./config/database');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _modelsUser = require('./models/user');

// Load environment variables from .env file
_dotenv2['default'].load();

var app = (0, _express2['default'])();
// database connection
_mongoose2['default'].connect(_configDatabase.dbUrl.url);
var db = _mongoose2['default'].connection;
db.on('error', function (err) {
  console.log(err);
  console.log('error connection');
});
db.once('open', function () {
  console.log('connect!!');
});

require('./config/passport')(_passport2['default']); // pass passport for configuration

app.use((0, _morgan2['default'])('dev'));
app.use((0, _cookieParser2['default'])());
app.use((0, _bodyParser2['default'])());
// required for passport
app.use((0, _expressSession2['default'])({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(_passport2['default'].initialize());
app.use(_passport2['default'].session()); // persistent login sessions
app.use((0, _connectFlash2['default'])()); // use connect-flash for flash messages stored in session
app.use(function (req, res, next) {
  req.isAuthorized = function () {
    var token = req.headers.authorization && req.headers.authorization.split(' ')[1] || req.cookies.token;
    try {
      return _jsonwebtoken2['default'].verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
      //console.log(err);
      return false;
    }
  };

  if (req.isAuthorized()) {
    var payload = req.isAuthorized();
    _modelsUser.User.findById(payload.sub, function (err, user) {
      req.user = user;
      next();
    });
  } else {
    next();
  }
});

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// routes ======================================================================
//app.all('/api/v1/*', [require('./middlewares/validateRequest')]);
require('./routes/main.routes.js')(app, _passport2['default']); // load our routes and pass in our app and fully configured passport

app.set('views', _path2['default'].join(__dirname, 'views'));
app.set('view engine', 'hjs');
// app.use('/', routes);
app.use(_express2['default']['static'](_path2['default'].join(__dirname, 'public')));
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
//# sourceMappingURL=server.js.map