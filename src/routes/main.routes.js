import express from 'express';
import bodyParser from 'body-parser';
import request from 'request';
import cheerio from 'cheerio';

// import chalk from 'chalk';
const clientID = '759dlh2okqws42';
const clientSecret = 'OnnN8xW3X5zecdei';

// var Linkedin = require('node-linkedin')(clientID, clientSecret, 'callback');

const router = express.Router();
const jsonParser = bodyParser.json();

router.get('/', (req, res) => {
  res.render('index', { title: 'nice' });
});

router.get('/oauth/linkedin', (req, res) => {
  res.send('oauth');
  // Linkedin.auth.authorize(res, scope);
});

router.get('/scrape/profile', (req, res) => {
  const url = 'https://www.linkedin.com/in/rizky-kusumo-b9ab4116';

  request(url, (error, response, html) => {
    if (!error) {
      const $ = cheerio.load(html);
      const headline = $('#summary .description').text();
      console.log(headline);
    }
    res.send('scrape');
  });
});


export default router;
