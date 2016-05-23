import express from 'express';
import bodyParser from 'body-parser';
import request from 'request';

// import chalk from 'chalk';
const clientID = '759dlh2okqws42';
const clientSecret = 'OnnN8xW3X5zecdei';

// var Linkedin = require('node-linkedin')(clientID, clientSecret, 'callback');

const router = express.Router();
const jsonParser = bodyParser.json();

router.get('/', (req, res) => {
  res.send('index');
});

router.get('/oauth/linkedin', (req, res) => {
  res.send('oauth');
  // Linkedin.auth.authorize(res, scope);
});


export default router;
