import express from 'express';
import bodyParser from 'body-parser';
import request from 'request';
import chalk from 'chalk';
import passport from 'passport';
import * as fileController from '../controllers/fileController';
import * as authController from '../controllers/authController';
const jsonParser = bodyParser.json();
import jwt from 'jsonwebtoken';


module.exports = (app, passport) => {

    app.post('/api/v1/savedata', jsonParser, fileController.saveData);
    app.post('/api/v1/getdata', jsonParser, isAuth, fileController.getData);
    app.post('/api/v1/linkedin/post', jsonParser, fileController.linkedinSave);
    app.post('/api/v1/adddata', jsonParser, fileController.addData);
    app.post('/api/v1/deletedata', jsonParser, fileController.deleteData);
    //auth
    app.post('/login', authController.loginAuth);
    app.post('/signup', authController.signupAuth);
    app.post('/login-chrome', authController.chromeAuth);

    app.get('/', (req, res) => {
      res.render('index', { title: 'index'});
    });

    app.get('/login', (req, res) => {
      res.render('index', { title: 'login' });
    });

    app.get('/signup', (req, res) => {
      res.render('index', { title: 'signup' });
    });

    app.get('/help', isLoggedIn, (req, res) => {
      res.render('index', { title: 'Help' });
    });

    app.get('/result/:id', isLoggedIn, (req, res) => {
      res.render('index', { title: 'Result'});
    });

    app.get('/addcoaster', isLoggedIn, (req, res) => {
      res.render('index', { title: 'Add Coaster' });
    });

    app.get('/coaster/active', isLoggedIn, (req, res) => {
      res.render('index', { title: 'Coaster Active'});
    });

    app.get('/logout', (req, res) => {
        res.clearCookie("token");
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated())
        return next();
    res.status(401).send({ msg: 'Unauthorized' });
}

const isAuth = (req, res, next) => {
  const token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token || req.body.token || req.query.token;
  // decode token
  if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {      
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

}




