import passport from 'passport';
import jwt from 'jsonwebtoken';
import moment from 'moment';

export const loginAuth = (req, res, next) => {
  passport.authenticate('local-login', function(err, user, info) { 
    console.log('error : ',err);
    console.log('info : ',info);
    console.log('user : ',user);
    if (err) { return next(err); }
    if (!user) { 
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
      //return res.redirect('/login'); 
    }
    req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.json({
          token:genToken(user),
          username:user.local.email
        });
    });
  })(req, res, next);
}

export const signupAuth = (req, res, next) => {
  passport.authenticate('local-signup', (err, user, info) => { 
    console.log(err);
    console.log(info);
    console.log(user);
    if (err) { return next(err); }
    if (!user) {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Signup Failed"
      });
      return;
    }
    req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.json(genToken(user));
    });
  })(req, res, next);
}

export const chromeAuth = (req, res, next) => {
  passport.authenticate('local-login', function(err, user, info) { 
    console.log(err);
    console.log(info);
    console.log(user);
    if (err) { return next(err); }
    if (!user) { 
      res.json({
        login: 'failed'
      });
      return false;
    }
    req.logIn(user, (err) => {
        console.log('user',user.local.email);
        if (err) { return next(err); }
        return res.json({
          login: 'success'
        });
    });
  })(req, res, next);
}

// private method
const genToken = (user) => {
  var payload = {
    iss: 'my.domain.com',
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(1, 'days').unix()
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET);
}
