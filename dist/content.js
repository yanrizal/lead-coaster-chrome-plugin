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
	  var findBtn = document.getElementById('find');
	  findBtn.addEventListener('click', function () {
	    var value = document.getElementById('search').value;
	    console.log(value);
	  });
	
	  loginLoaded();
	});
	
	var loginLoaded = function loginLoaded() {
	  var loginBtn = document.getElementById('loginBtn');
	  var email = document.getElementById('inputEmail').value;
	  var password = document.getElementById('inputPassword').value;
	
	  loginBtn.addEventListener('click', function () {
	    console.log('log');
	    $.ajax({
	      url: 'http://localhost:3000/login-chrome',
	      dataType: 'json',
	      cache: false,
	      type: 'post',
	      data: {
	        email: email,
	        password: password
	      },
	      success: function success(response) {
	        console.log(response);
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