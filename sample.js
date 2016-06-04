var json = require('tmp/mysearch.json');
require('utils').dump(json);

var casper = require('casper').create({   
    verbose: true,
    pageSettings: {
         loadImages:  false,         // The WebPage instance used by Casper will
         loadPlugins: false,         // use these settings
         userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
    }
});

var url = 'https://www.linkedin.com/';
casper.start(url, function() {
   // search for 'casperjs' from google form
   console.log("page loaded");
   console.log(json.url);
	this.waitForSelector('form.login-form', function(){
		 console.log('form loaded')
		 this.fillSelectors('form.login-form', {
	        'input#login-email' : 'yanuar.rizal@mbiz.co.id',
	        'input#login-password' : '@FYhdv9Y'
	    }, true);
	});
});

casper.waitWhileSelector('form.login-form', function(){
    console.log('selector is no more!');
});

casper.then(function(){
    console.log(this.getTitle());
});

casper.thenOpen('https://www.linkedin.com/vsearch/p?type=people&keywords=yanuar', function() {
    console.log(this.getTitle());
    var name = this.evaluate(function(){
    	return document.querySelectorAll('.main-headline')[0].innerHTML
    });
    console.log(name);
});


casper.run();