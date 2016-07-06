import express from 'express';
import path from 'path';
import routes from './routes/main.routes';
import mongoose from 'mongoose';
import passport from 'passport';
import flash from 'connect-flash';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import { dbUrl } from './config/database';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { User } from './models/user';
// Load environment variables from .env file
dotenv.load();

const app = express();
// database connection
mongoose.connect(dbUrl.url);
const db = mongoose.connection;
db.on('error', (err) => {
  console.log(err);
  console.log('error connection');
});
db.once('open', () => {
  console.log('connect!!');
});

require('./config/passport')(passport); // pass passport for configuration

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use((req, res, next) => {
  req.isAuthorized = function() {
    const token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;
    try {
      return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
      //console.log(err);
      return false;
    }
  };

  if (req.isAuthorized()) {
    var payload = req.isAuthorized();
    User.findById(payload.sub, function(err, user) {
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
require('./routes/main.routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
// app.use('/', routes);
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
