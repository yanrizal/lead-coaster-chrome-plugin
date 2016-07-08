'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var fileSchema = new _mongoose2['default'].Schema({
  data: [{
    dataIndex: { type: Number, max: 2000 },
    urlSearch: { type: String },
    totalSearch: { type: String },
    leadCount: { type: Number, max: 2000 },
    profileVisit: { type: Array },
    searchName: { type: String },
    lastPage: { type: Number }
  }],
  meta: {
    username: { type: String },
    linkedin: {
      email: { type: String },
      password: { type: String }
    }
  }
});

var File = _mongoose2['default'].model('File', fileSchema, 'file');

var findFile = function findFile(params, cb) {
  console.log(params.username);
  File.findOne({ 'meta.username': params.username }, function (err, file) {
    console.log(file);
    if (err) return cb(err);
    cb(null, file);
    return true;
  });
};

exports.findFile = findFile;
var deleteFile = function deleteFile(params, cb) {
  console.log(params.username);
  File.findOne({ 'meta.username': params.username }, function (err, file) {
    if (err) return cb(err);
    for (var i = 0; i < file.data.length; i++) {
      if (file.data[i].searchName === params.searchName) {
        file.data.splice(i, 1);
        break;
      }
    }
    file.save(function (err, response) {
      var result = {
        successfully_deleted: false
      };
      if (err) return cb(null, result);
      result.successfully_deleted = true;
      cb(null, result);
      return true;
    });
  });
};

exports.deleteFile = deleteFile;
var addLinkedin = function addLinkedin(params, cb) {
  console.log(params.username);
  File.findOne({ 'meta.username': params.username }, function (err, file) {
    console.log(file);
    if (err) return cb(err);
    var algorithm = 'aes256';
    var key = 'password';
    var passwordKey = params.password;
    var cipher = _crypto2['default'].createCipher(algorithm, key);
    var encrypted = cipher.update(passwordKey, 'utf8', 'hex') + cipher.final('hex');
    console.log(encrypted);
    file.meta.linkedin.email = params.email;
    file.meta.linkedin.password = encrypted;
    file.save(function (err, response) {
      console.log(response);
      var result = {
        successfully_updated: false
      };
      if (err) return cb(null, result);
      result.successfully_updated = true;
      cb(null, result);
      return true;
    });
  });
};

exports.addLinkedin = addLinkedin;
var addFile = function addFile(params, cb) {
  var result = {};
  console.log(params.meta.username);
  File.findOne({ 'meta.username': params.meta.username }, function (err, file) {
    console.log(file);
    if (file === null) {
      var newFile = new File(params);
      newFile.save(function (err, response) {
        console.log(response);
        result = {
          successfully_created: false
        };
        if (err) return cb(null, result);
        result.successfully_created = true;
        cb(null, result);
        return true;
      });
    } else {
      params.data[0].leadCount = 0;
      params.data[0].dataIndex = file.data.length;
      file.data.push(params.data[0]);
      file.save(function (err, response) {
        console.log(response);
        var result = {
          successfully_updated: false
        };
        if (err) return cb(null, result);
        result.successfully_updated = true;
        cb(null, result);
        return true;
      });
    }
  });
};

exports.addFile = addFile;
var saveFile = function saveFile(params, cb) {
  var result = {};
  console.log(params.meta.username);
  File.findOne({ 'meta.username': params.meta.username }, function (error, file) {
    console.log(file);
    if (file === null) {
      var newFile = new File(params);
      newFile.save(function (err, response) {
        console.log(response);
        result = {
          successfully_created: false
        };
        if (err) return cb(null, result);
        result.successfully_created = true;
        cb(null, result);
        return true;
      });
    } else {
      var index = params.data[0].dataIndex;
      file.data[index].totalSearch = params.data[0].totalSearch;
      file.data[index].profileVisit = params.data[0].profileVisit;
      file.data[index].lastPage = params.data[0].lastPage;
      file.data[index].leadCount = params.data[0].leadCount;
      //file.meta.lastPage = params.meta.lastPage;
      console.log(params.data[0].totalSearch);
      file.save(function (err, response) {
        console.log(response);
        console.log(err);
        var result = {
          successfully_updated: false
        };
        if (err) return cb(null, result);
        result.successfully_updated = true;
        cb(null, result);
        return true;
      });
    }
  });
};
exports.saveFile = saveFile;
//# sourceMappingURL=file.js.map