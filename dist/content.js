/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	(function () {
	  // Convert array to object
	  var convArrToObj = function convArrToObj(array) {
	    var thisEleObj = new Object();
	    if ((typeof array === 'undefined' ? 'undefined' : _typeof(array)) == "object") {
	      for (var i in array) {
	        var thisEle = convArrToObj(array[i]);
	        thisEleObj[i] = thisEle;
	      }
	    } else {
	      thisEleObj = array;
	    }
	    return thisEleObj;
	  };
	  var oldJSONStringify = JSON.stringify;
	  JSON.stringify = function (input) {
	    if (oldJSONStringify(input) == '[]') return oldJSONStringify(convArrToObj(input));else return oldJSONStringify(input);
	  };
	})();
	
	var username = '';
	
	var getCurrentTabUrl = function getCurrentTabUrl(callback) {
	  // Query filter to be passed to chrome.tabs.query - see
	  // https://developer.chrome.com/extensions/tabs#method-query
	  var queryInfo = {
	    active: true,
	    currentWindow: true
	  };
	
	  chrome.tabs.query(queryInfo, function (tabs) {
	    var tab = tabs[0];
	    var url = tab.url;
	    console.assert(typeof url === 'string', 'tab.url should be a string');
	
	    callback(url);
	  });
	};
	
	var renderStatus = function renderStatus(statusText) {
	  //document.getElementById('status').textContent = statusText;
	};
	
	document.addEventListener('DOMContentLoaded', function () {
	  getCurrentTabUrl(function (url) {
	    //renderStatus(url);
	  });
	
	  addSearch();
	  loginLoaded();
	});
	
	var addSearch = function addSearch() {
	  var findBtn = document.getElementById('find');
	  findBtn.addEventListener('click', function () {
	    var value = document.getElementById('search').value;
	    var searchName = document.getElementById('searchName').value;
	    console.log(value);
	    $.ajax({
	      url: 'https://lead-coaster.herokuapp.com/adddata',
	      dataType: 'json',
	      cache: false,
	      type: 'post',
	      data: {
	        username: username,
	        urlSearch: value,
	        searchName: searchName
	      },
	      success: function success(response) {
	        console.log(response);
	        $('.add-status').text('');
	        if (response.successfully_updated) {
	          $('.add-status').text('url added');
	        } else {
	          $('.add-status').text('failed');
	        }
	      },
	      error: function error(xhr, status, err) {
	        console.error(xhr);
	      }
	    });
	  });
	};
	
	var loginLoaded = function loginLoaded() {
	  var loginBtn = document.getElementById('loginBtn');
	  loginBtn.addEventListener('click', function () {
	    var email = document.getElementById('inputEmail').value;
	    var password = document.getElementById('inputPassword').value;
	    $('#loginBtn').attr('disabled', true);
	    $('#loginBtn').text('wait');
	    $.ajax({
	      url: 'https://lead-coaster.herokuapp.com/login-chrome',
	      dataType: 'json',
	      cache: false,
	      type: 'post',
	      data: {
	        email: email,
	        password: password
	      },
	      success: function success(response) {
	        console.log(response);
	        $('#loginBtn').attr('disabled', false);
	        $('#loginBtn').text('login');
	        $('.login-status').text('');
	        if (response.login === 'success') {
	          username = email;
	          $('.loginField').hide();
	          $('.searchField').show();
	        } else {
	          $('.login-status').text('username/password wrong');
	        }
	        // if(response.data.length === 0){
	        //   console.log('zero')
	        //   $('.login-status').text('username/password wrong')
	        // }else{
	        //   console.log('ada');
	        //   username = email;
	        //   //const profileVisit = JSON.parse(response.data[0].profileVisit);
	        //   $('.loginField').hide();
	        //   $('.searchField').show();
	        // }
	      },
	      error: function error(xhr, status, err) {
	        console.error(xhr);
	      }
	    });
	  });
	};

/***/ }
/******/ ]);
//# sourceMappingURL=content.js.map