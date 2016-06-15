var fs = require('fs');
// data chrome extension copy search url
var searchChrome;
var path = 'tmp/mysearch.json';
if (!fs.exists(path)){
  searchChrome = {}
}else{
  searchChrome = require(path);
}

require('utils').dump(searchChrome);

var casper = require('casper').create({   
    verbose: true,
    pageSettings: {
      loadImages:  false,   
      loadPlugins: false, 
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
    }
});

//PROFILE DATA
var lkdUsername = 'yanuar.rizal@mbiz.co.id';
var lkdPassword = '@FYhdv9Y';
var totalSearch = 0;

//LOAD DATA
var jsonData,dataProfile;
var pathData = 'tmp/data-'+lkdUsername+'.json';
if (!fs.exists(pathData)){
  jsonData = {};
  //require('utils').dump(jsonData);
  dataProfile = [];
}else{
  jsonData = require(pathData);
  require('utils').dump(jsonData);
  dataProfile = jsonData.data[0].profileVisit;
  console.log('length data', dataProfile.length)
}


// GLOBAL VARIABLE
var links;
var i = -1;
var page = Math.floor(dataProfile.length/10)+1;
console.log('page', page);
var urlSearch = 'https://www.linkedin.com/vsearch/p?type=people&keywords=yanuar&page_num='+page;

function getLinks() {
    var allLinks = document.querySelectorAll('.main-headline');
    return Array.prototype.map.call(allLinks, function (e) {
        return e.getAttribute('href')
    });
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

var url = 'https://www.linkedin.com/';
casper.start(url, function() {
	this.waitForSelector('form.login-form', function(){
		 console.log('form loaded')
		 this.fillSelectors('form.login-form', {
	        'input#login-email' : lkdUsername,
	        'input#login-password' : lkdPassword
	    }, true);
	});
});

casper.waitWhileSelector('form.login-form', function(){
    console.log('logged in');
});

casper.then(function(){
    console.log(this.getTitle());
});

casper.thenOpen(urlSearch, function() {
    console.log(this.getTitle());
    links = this.evaluate(getLinks);
    //console.log(links);
    totalSearch = this.evaluate(function(){
        var tot = document.querySelectorAll('#results_count strong')[0].innerHTML;
        return tot
    });
    console.log('totalSearch', totalSearch);    
    this.each(links, function() { 
        i++; 
        console.log(links[i]);
        this.thenOpen((links[i]), function() {
            //console.log(this.getTitle());
            var data = this.evaluate(function(){
              var fullName = document.querySelector('.full-name').innerHTML;
              var idUrl = document.querySelector('.view-public-profile').getAttribute('href');
              return {
                'fullName': fullName,
                'idUrl': idUrl
              };
            });
            console.log(data.idUrl, data.fullName);
            var flag = true;
            for(var i=0;i<dataProfile.length;i++){
                if(dataProfile[i].idUrl === data.idUrl){
                  flag = false;
                  break;
                }else{
                  flag = true;
                }
            }
            if(flag){
              dataProfile.push(data); 
            }
        }).wait(getRandomArbitrary(5000,30000));
    });
});

casper.thenOpen("http://localhost:3000/savedata", {
      method: 'post',
      data:{
          "lkdUsername": lkdUsername,
          "urlSearch": urlSearch,
          "totalSearch": totalSearch,
          "dataProfile": dataProfile,
          "page": page
      }
});

casper.then(function(){
  console.log('saved');
  // var jsonStr = {
  //   data:[{
  //     username: lkdUsername,
  //     urlSearch: urlSearch,
  //     totalSearch: totalSearch,
  //     profileVisit: dataProfile
  //   }],
  //   meta:{
  //     page: 1
  //   }
  // };
  // var myfile = 'tmp/data-'+lkdUsername+'.json';
  // fs.write(myfile, JSON.stringify(jsonStr), 'w');
});


casper.run();