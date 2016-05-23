import express from 'express';
import bodyParser from 'body-parser';
import request from 'request';
var Linkedin = require('node-linkedin')('app-id', 'secret', 'callback');

// import chalk from 'chalk';

const router = express.Router();
const jsonParser = bodyParser.json();

router.get('/', (req, res) => {
  res.send('index');
});

router.get('/linkedin', (req, res) => {
  request('', function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log('err');
    }
  });
});


export default router;
