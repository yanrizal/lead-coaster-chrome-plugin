/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	eval("'use strict';\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol ? \"symbol\" : typeof obj; };\n\n(function () {\n  // Convert array to object\n  var convArrToObj = function convArrToObj(array) {\n    var thisEleObj = new Object();\n    if ((typeof array === 'undefined' ? 'undefined' : _typeof(array)) == \"object\") {\n      for (var i in array) {\n        var thisEle = convArrToObj(array[i]);\n        thisEleObj[i] = thisEle;\n      }\n    } else {\n      thisEleObj = array;\n    }\n    return thisEleObj;\n  };\n  var oldJSONStringify = JSON.stringify;\n  JSON.stringify = function (input) {\n    if (oldJSONStringify(input) == '[]') return oldJSONStringify(convArrToObj(input));else return oldJSONStringify(input);\n  };\n})();\n\nvar username = '';\n\nvar getCurrentTabUrl = function getCurrentTabUrl(callback) {\n  // Query filter to be passed to chrome.tabs.query - see\n  // https://developer.chrome.com/extensions/tabs#method-query\n  var queryInfo = {\n    active: true,\n    currentWindow: true\n  };\n\n  chrome.tabs.query(queryInfo, function (tabs) {\n    var tab = tabs[0];\n    var url = tab.url;\n    console.assert(typeof url === 'string', 'tab.url should be a string');\n\n    callback(url);\n  });\n};\n\nvar renderStatus = function renderStatus(statusText) {\n  //document.getElementById('status').textContent = statusText;\n};\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  getCurrentTabUrl(function (url) {\n    //renderStatus(url);\n  });\n\n  addSearch();\n  loginLoaded();\n});\n\nvar addSearch = function addSearch() {\n  var findBtn = document.getElementById('find');\n  findBtn.addEventListener('click', function () {\n    var value = document.getElementById('search').value;\n    var searchName = document.getElementById('searchName').value;\n    console.log(value);\n    $.ajax({\n      url: 'https://lead-coaster.herokuapp.com/api/v1/adddata',\n      dataType: 'json',\n      cache: false,\n      type: 'post',\n      data: {\n        username: username,\n        urlSearch: value,\n        searchName: searchName\n      },\n      success: function success(response) {\n        console.log(response);\n        $('.add-status').text('');\n        if (response.successfully_updated) {\n          $('.add-status').text('url added');\n        } else if (response.successfully_created) {\n          $('.add-status').text('url added');\n        } else {\n          $('.add-status').text('failed');\n        }\n      },\n      error: function error(xhr, status, err) {\n        console.error(xhr);\n      }\n    });\n  });\n};\n\nvar loginLoaded = function loginLoaded() {\n  var loginBtn = document.getElementById('loginBtn');\n  loginBtn.addEventListener('click', function () {\n    var email = document.getElementById('inputEmail').value;\n    var password = document.getElementById('inputPassword').value;\n    $('#loginBtn').attr('disabled', true);\n    $('#loginBtn').text('wait');\n    $.ajax({\n      url: 'https://lead-coaster.herokuapp.com/login-chrome',\n      dataType: 'json',\n      cache: false,\n      type: 'post',\n      data: {\n        email: email,\n        password: password\n      },\n      success: function success(response) {\n        console.log(response);\n        $('#loginBtn').attr('disabled', false);\n        $('#loginBtn').text('login');\n        $('.login-status').text('');\n        if (response.login === 'success') {\n          username = email;\n          $('.loginField').hide();\n          $('.searchField').show();\n        } else {\n          $('.login-status').text('username/password wrong');\n        }\n        // if(response.data.length === 0){\n        //   console.log('zero')\n        //   $('.login-status').text('username/password wrong')\n        // }else{\n        //   console.log('ada');\n        //   username = email;\n        //   //const profileVisit = JSON.parse(response.data[0].profileVisit);\n        //   $('.loginField').hide();\n        //   $('.searchField').show();\n        // }\n      },\n      error: function error(xhr, status, err) {\n        console.error(xhr);\n      }\n    });\n  });\n};\n\n/*****************\n ** WEBPACK FOOTER\n ** ./chrome-extension/content.js\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./chrome-extension/content.js?");

/***/ }
/******/ ]);