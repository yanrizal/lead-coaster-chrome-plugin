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

var app = (0, _express2['default'])();

// database connection
_mongoose2['default'].connect('mongodb://juonliners:janudroid@ds011860.mlab.com:11860/zoho-db-file');
// mongoose.connect('mongodb://localhost/zoho-db');
var db = _mongoose2['default'].connection;
db.on('error', function (err) {
  console.log(err);
  console.log('error connection');
});
db.once('open', function () {
  console.log('connect!!');
});

app.set('views', _path2['default'].join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.use('/', _routesMainRoutes2['default']);
app.use(_express2['default']['static'](_path2['default'].join(__dirname, 'public')));
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
//# sourceMappingURL=server.js.map