!function(t){function e(o){if(n[o])return n[o].exports;var a=n[o]={exports:{},id:o,loaded:!1};return t[o].call(a.exports,a,a.exports,e),a.loaded=!0,a.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};!function(){var t=function o(t){var e=new Object;if("object"==("undefined"==typeof t?"undefined":n(t)))for(var a in t){var r=o(t[a]);e[a]=r}else e=t;return e},e=JSON.stringify;JSON.stringify=function(n){return e("[]"==e(n)?t(n):n)}}();var o="",a=function(t){var e={active:!0,currentWindow:!0};chrome.tabs.query(e,function(e){var n=e[0],o=n.url;console.assert("string"==typeof o,"tab.url should be a string"),t(o)})};document.addEventListener("DOMContentLoaded",function(){a(function(t){}),r(),s()});var r=function(){var t=document.getElementById("find");t.addEventListener("click",function(){var t=document.getElementById("search").value,e=document.getElementById("searchName").value;console.log(t),$.ajax({url:"https://lead-coaster.herokuapp.com/api/v1/adddata",dataType:"json",cache:!1,type:"post",data:{username:o,urlSearch:t,searchName:e},success:function(t){console.log(t),$(".add-status").text(""),t.successfully_updated?$(".add-status").text("url added"):t.successfully_created?$(".add-status").text("url added"):$(".add-status").text("failed")},error:function(t,e,n){console.error(t)}})})},s=function(){var t=document.getElementById("loginBtn");t.addEventListener("click",function(){var t=document.getElementById("inputEmail").value,e=document.getElementById("inputPassword").value;$("#loginBtn").attr("disabled",!0),$("#loginBtn").text("wait"),$.ajax({url:"https://lead-coaster.herokuapp.com/login-chrome",dataType:"json",cache:!1,type:"post",data:{email:t,password:e},success:function(e){console.log(e),$("#loginBtn").attr("disabled",!1),$("#loginBtn").text("login"),$(".login-status").text(""),"success"===e.login?(o=t,$(".loginField").hide(),$(".searchField").show()):$(".login-status").text("username/password wrong")},error:function(t,e,n){console.error(t)}})})}}]);