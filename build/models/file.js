'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var fileSchema = new _mongoose2['default'].Schema({
  data: [{
    username: { type: String },
    urlSearch: { type: String },
    totalSearch: { type: String },
    profileVisit: { type: Array },
    searchName: { type: String }
  }],
  meta: {
    lastPage: { type: Number }
  }
});

var File = _mongoose2['default'].model('File', fileSchema, 'file');

var findFile = function findFile(params, cb) {
  console.log(params.username);
  File.findOne({ 'data.username': params.username }, function (err, file) {
    console.log(file);
    if (err) return cb(err);
    cb(null, file);
    return true;
  });
};

exports.findFile = findFile;
var addFile = function addFile(params, cb) {
  console.log(params.username);
  File.findOne({ 'data.username': params.username }, function (err, file) {
    console.log(file);
    if (err) return cb(err);
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
  });
};

exports.addFile = addFile;
var saveFile = function saveFile(params, cb) {
  var result = {};
  console.log(params.data[0].username);
  File.findOne({ 'data.username': params.data[0].username }, function (error, file) {
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
      file.data[0] = params.data[0];
      file.meta.lastPage = params.meta.lastPage;
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
exports.saveFile = saveFile;
//# sourceMappingURL=file.js.map