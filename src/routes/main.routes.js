import express from 'express';
import bodyParser from 'body-parser';
import request from 'request';
import chalk from 'chalk';
import passport from 'passport';
import * as fileController from '../controllers/fileController';
import * as authController from '../controllers/authController';
const jsonParser = bodyParser.json();


module.exports = (app, passport) => {

    app.post('/api/v1/savedata', jsonParser, fileController.saveData);
    app.post('/api/v1/getdata', jsonParser, isLoggedIn, fileController.getData);
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

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.status(401).send({ msg: 'Unauthorized' });
}




