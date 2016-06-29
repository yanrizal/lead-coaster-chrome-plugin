'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

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
    username: { type: String }
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
var addFile = function addFile(params, cb) {
  console.log(params.meta.username);
  File.findOne({ 'meta.username': params.meta.username }, function (err, file) {
    console.log(file);
    params.leadCount = '0';
    params.dataIndex = file.data.length;
    if (file === null) {
      file.data.push(params);
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
    } else {
      var index = params.data[0].dataIndex;
      file.data[index].totalSearch = params.data[0].totalSearch;
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