import express from 'express';
import bodyParser from 'body-parser';
import request from 'request';
import cheerio from 'cheerio';
import Crawler from 'simplecrawler';
import querystring from 'querystring';
import fs from 'fs';
import chalk from 'chalk';
import passport from 'passport';
import { saveFile, findFile, addFile, addLinkedin } from '../models/file';
import jwt from 'jwt-simple';
const jsonParser = bodyParser.json();

// app/routes.js
module.exports = (app, passport) => {

    app.get('/', (req, res) => {
      let user = (req.user ? true : false);
      let email = (req.user ? req.user.local.email : '');
      //console.log(req.body);
      res.render('index', { title: 'index', user: user, email: email });
    });

    app.post('/api/v1/savedata', jsonParser, (req, res) => {
      const params = {
        data:[{
          urlSearch: req.body.urlSearch,
          totalSearch: req.body.totalSearch,
          profileVisit: req.body.dataProfile,
          leadCount: req.body.leadCount,
          dataIndex: req.body.dataIndex,
          searchName: req.body.searchName,
          lastPage: req.body.page
        }],
        meta:{
          username: req.body.lkdUsername,
          linkedin: {
            email: '',
            password: ''
          }
        }
      };
      saveFile(params, (err, response) => {
        console.log(response);
        res.json(response);
      });
    });

    app.post('/api/v1/getdata', jsonParser, (req, res) => {
      const params = {
        username: req.body.lkdUsername
      };
      findFile(params, (err, response) => {
        console.log(response);
        res.json(response);
      });
    });

    app.post('/api/v1/linkedin/post', jsonParser, (req, res) => {
      const params = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      };
      addLinkedin(params, (err, response) => {
        console.log(response);
        res.json(response);
      });
    });

    app.post('/api/v1/adddata', jsonParser, (req, res) => {
      const params = {
        data:[{
          urlSearch: req.body.urlSearch,
          totalSearch: '0',
          profileVisit: [],
          leadCount: 0,
          dataIndex: 0,
          searchName: req.body.searchName,
          lastPage: 0
        }],
        meta:{
          username: req.body.username,
          linkedin: {
            email: '',
            password: ''
          }
        }
      };
      addFile(params, (err, response) => {
        console.log(response);
        res.json(response);
      });
    });


    app.get('/login', (req, res) => {
      let user = (req.user ? true : false);
      res.render('index', { title: 'login', user: user });
    });

    // process the login form
    app.post('/login', (req, res, next) => {
      passport.authenticate('local-login', function(err, user, info) { 
        console.log(err);
        console.log(info);
        console.log(user);
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
            return res.json(genToken(user));
        });
      })(req, res, next);
    });

    app.post('/login-chrome', (req, res, next) => {
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
    });

    app.get('/signup', (req, res) => {
      let user = (req.user ? true : false);
      res.render('index', { title: 'signup', user: user });
    });

    app.post('/signup', (req, res, next) => {
      passport.authenticate('local-signup', (err, user, info) => { 
        console.log(err);
        console.log(info);
        console.log(user);
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.json({detail: info});
        });
      })(req, res, next);
    });

    app.get('/help', isLoggedIn, (req, res) => {
      console.log(req.user);
      let user = (req.user ? true : false);
      let email = (req.user ? req.user.local.email : '');
      res.render('index', { title: 'Help', user: user, email: email });
    });

    app.get('/result/:id', isLoggedIn, (req, res) => {
      console.log(req.user);
      let user = (req.user ? true : false);
      let email = (req.user ? req.user.local.email : '');
      res.render('index', { title: 'Result', user: user, email: email });
    });

    app.get('/coaster/active', isLoggedIn, (req, res) => {
      console.log(req.user);
      let user = (req.user ? true : false);
      let email = (req.user ? req.user.local.email : '');
      res.render('index', { title: 'Coaster Active', user: user, email: email });
    });

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
const isLoggedIn = (req, res, next) => {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

// private method
const genToken = (user) => {
  const expires = expiresIn(7); // 7 days
  const token = jwt.encode({
    exp: expires
  }, require('../config/secret')());
  console.log(token);
  return {
    token: token,
    expires: expires,
    user: user
  };
}

const expiresIn = (numDays) => {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}



