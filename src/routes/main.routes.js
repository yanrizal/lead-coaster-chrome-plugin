import express from 'express';
import bodyParser from 'body-parser';
import request from 'request';
import cheerio from 'cheerio';
import Crawler from 'simplecrawler';
import querystring from 'querystring';
import fs from 'fs';
import chalk from 'chalk';
import passport from 'passport';
import { saveFile, findFile, addFile } from '../models/file';

// const clientID = '759dlh2okqws42';
// const clientSecret = 'OnnN8xW3X5zecdei';
// const proxy = 'http://101.96.10.30:84';
// const agent = new HttpsProxyAgent(proxy);

// const router = express.Router();
const jsonParser = bodyParser.json();

// app/routes.js
module.exports = function(app, passport) {

    app.get('/', function(req, res) {
      let user = (req.user ? true : false);
      let email = (req.user ? req.user.local.email : '');
      res.render('index', { title: 'index', user: user, email: email });
    });

    app.post('/post/url', jsonParser, (req, res) => {
      const params = {
        url: req.body.url
      };
      console.log(params.url);
      const outputFilename = 'tmp/mysearch.json';

      fs.writeFile(outputFilename, JSON.stringify(params, null, 4), function(err) {
          if(err) {
            console.log(err);
          } else {
            console.log("JSON saved to " + outputFilename);
          }
      });
      res.json(params.url);
    });

    app.post('/savedata', jsonParser, (req, res) => {
      const params = {
        data:[{
          username: req.body.lkdUsername,
          urlSearch: req.body.urlSearch,
          totalSearch: req.body.totalSearch,
          profileVisit: req.body.dataProfile
        }],
        meta:{
          lastPage: req.body.page
        }
      };
      saveFile(params, (err, response) => {
        console.log(response);
        res.json(response);
      });
    });

    app.post('/getdata', jsonParser, (req, res) => {
      const params = {
        username: req.body.lkdUsername
      };
      findFile(params, (err, response) => {
        console.log(response);
        res.json(response);
      });
    });

    app.post('/adddata', jsonParser, (req, res) => {
      const params = {
        profileVisit: [],
        totalSearch: 0,
        urlSearch: req.body.urlSearch,
        username: req.body.username,
        searchName: req.body.searchName
      };
      addFile(params, (err, response) => {
        console.log(response);
        res.json(response);
      });
    });


    app.get('/login', function(req, res) {
      let user = (req.user ? true : false);
      res.render('index', { title: 'login', user: user });
    });

    // process the login form
    app.post('/login', function(req, res, next) {
      passport.authenticate('local-login', function(err, user, info) { 
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

    app.post('/login-chrome', function(req, res, next) {
      passport.authenticate('local-login', function(err, user, info) { 
        console.log(err);
        console.log(info);
        console.log(user);
        if (err) { return next(err); }
        if (!user) { 
          res.json({
            data: []
          });
          return false;
        }
        req.logIn(user, function(err) {
            console.log('user',user.local.email);
            if (err) { return next(err); }
            const params = {
              username: user.local.email
            } 
            findFile(params, (err, response) => {
              console.log(response);
              res.json(response);
            });
        });
      })(req, res, next);
    });

    app.get('/signup', function(req, res) {
      let user = (req.user ? true : false);
      res.render('index', { title: 'signup', user: user });
    });

    app.post('/signup', function(req, res, next) {
      passport.authenticate('local-signup', function(err, user, info) { 
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

    app.get('/help', isLoggedIn, function(req, res) {
      console.log(req.user);
      let user = (req.user ? true : false);
      let email = (req.user ? req.user.local.email : '');
      res.render('index', { title: 'Help', user: user, email: email });
    });

    app.get('/result/:id', isLoggedIn, function(req, res) {
      console.log(req.user);
      let user = (req.user ? true : false);
      let email = (req.user ? req.user.local.email : '');
      res.render('index', { title: 'Result', user: user, email: email });
    });

    app.get('/coaster/active', isLoggedIn, function(req, res) {
      console.log(req.user);
      let user = (req.user ? true : false);
      let email = (req.user ? req.user.local.email : '');
      res.render('index', { title: 'Coaster Active', user: user, email: email });
    });

    app.post('/coaster/api', jsonParser, (req, res) => {
      const params = {
        email: req.body.email
      };
      let obj;
      const file = 'tmp/data-'+params.email+'.json';
      fs.readFile(file, 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        res.json(obj);
      });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}




