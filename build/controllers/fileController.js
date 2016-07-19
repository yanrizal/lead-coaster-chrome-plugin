'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _modelsFile = require('../models/file');

//fileController

var getData = function getData(req, res) {
  var params = {
    username: req.body.lkdUsername
  };
  (0, _modelsFile.findFile)(params, function (err, response) {
    console.log(response);
    res.json(response);
  });
};

exports.getData = getData;
var saveData = function saveData(req, res) {
  var params = {
    data: [{
      urlSearch: req.body.urlSearch,
      totalSearch: req.body.totalSearch,
      profileVisit: req.body.dataProfile,
      leadCount: req.body.leadCount,
      dataIndex: req.body.dataIndex,
      searchName: req.body.searchName,
      lastPage: req.body.page
    }],
    meta: {
      username: req.body.lkdUsername,
      linkedin: {
        email: '',
        password: ''
      }
    }
  };
  (0, _modelsFile.saveFile)(params, function (err, response) {
    console.log(response);
    res.json(response);
  });
};

exports.saveData = saveData;
var addData = function addData(req, res) {
  var params = {
    data: [{
      urlSearch: req.body.urlSearch,
      searchName: req.body.searchName,
      startDate: req.body.startDate
    }],
    meta: {
      username: req.body.username
    }
  };
  (0, _modelsFile.addFile)(params, function (err, response) {
    console.log(response);
    res.json(response);
  });
};

exports.addData = addData;
var linkedinSave = function linkedinSave(req, res) {
  var params = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };
  (0, _modelsFile.addLinkedin)(params, function (err, response) {
    console.log(response);
    res.json(response);
  });
};

exports.linkedinSave = linkedinSave;
var deleteData = function deleteData(req, res) {
  var params = {
    searchName: req.body.searchName,
    username: req.body.username
  };
  (0, _modelsFile.deleteFile)(params, function (err, response) {
    console.log(response);
    res.json(response);
  });
};
exports.deleteData = deleteData;
//# sourceMappingURL=fileController.js.map