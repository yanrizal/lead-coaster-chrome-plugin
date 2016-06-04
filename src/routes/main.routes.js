import express from 'express';
import bodyParser from 'body-parser';
import request from 'request';
import cheerio from 'cheerio';
import Crawler from 'simplecrawler';
import querystring from 'querystring';
import fs from 'fs';
import chalk from 'chalk';

// const clientID = '759dlh2okqws42';
// const clientSecret = 'OnnN8xW3X5zecdei';
// const proxy = 'http://101.96.10.30:84';
// const agent = new HttpsProxyAgent(proxy);

const router = express.Router();
const jsonParser = bodyParser.json();


router.get('/', (req, res) => {
  res.render('index', { title: 'nice' });
});

router.post('/post/url', jsonParser, (req, res) => {
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

router.get('/crawler', (req, res) => {
   var request2 = request.defaults({jar: true})
    request2('http://www.linkedin.com', function (error, response, body) {
      //console.log(body);

      const $ = cheerio.load(body);
      const csrf = $('#loginCsrfParam-login').val();
      console.log(csrf);
      console.log(response.headers["set-cookie"]);
      var dataCookie = mkdataCookie('MC_STORE_ID=66860; expires=' + new Date(new Date().getTime() + 86409000));
      var form = {
          session_key: 'yanuarrizal89@gmail.com',
          session_password: '',
          isJsEnabled: 'false',
          loginCsrfParam: csrf,
          sourceAlias:'0_7r5yezRXCiA_H0CRD8sf6DhOjTKUNps5xGTqeX8EEoi'
      };

      var formData = querystring.stringify(form);
      var contentLength = formData.length;
      const urlLogin = 'https://www.linkedin.com/uas/login-submit';
      request({
          headers: {
            'Content-Length': contentLength,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': dataCookieToString(dataCookie)
          },
          uri: urlLogin,
          body: formData,
          method: 'POST'
        }, function (err, res, body) {
          //it works!
          console.log(body);
          var wstream = fs.createWriteStream('myOutput.txt');
          wstream.write(body);
          wstream.end();
        });
    });
});

function dataCookieToString(dataCookie) {
    var t = "";
    for (var x = 0; x < dataCookie.length; x++) {
        t += ((t != "") ? "; " : "") + dataCookie[x].key + "=" + dataCookie[x].value;
    }
    return t;
}

function mkdataCookie(cookie) {
    var t, j;
    cookie = cookie.toString().replace(/,([^ ])/g, ",[12],$1").split(",[12],");
    for (var x = 0; x < cookie.length; x++) {
        cookie[x] = cookie[x].split("; ");
        j = cookie[x][0].split("=");
        t = {
            key: j[0],
            value: j[1]
        };
        for (var i = 1; i < cookie[x].length; i++) {
            j = cookie[x][i].split("=");
            t[j[0]] = j[1];
        }
        cookie[x] = t;
    }

    return cookie;
}


export default router;
