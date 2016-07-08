import mongoose from 'mongoose';
import crypto from 'crypto';
import assert from 'assert';

const fileSchema = new mongoose.Schema({
  data:[{
    dataIndex: { type: Number, max: 2000 },
	  urlSearch: { type: String },
	  totalSearch: { type: String },
    leadCount: { type: Number, max: 2000 },
	  profileVisit: { type: Array },
    searchName: { type: String },
    lastPage: { type: Number }
	}],
	meta:{
    username: { type: String },
    linkedin: {
      email: {type: String},
      password: {type: String}
    }
	}
});

const File = mongoose.model('File', fileSchema, 'file');

export const findFile = (params, cb) => {
  console.log(params.username);
  File.findOne({ 'meta.username': params.username }, (err, file) => {
    console.log(file);
    if (err) return cb(err);
    cb(null, file);
    return true;
  });
};

export const deleteFile = (params, cb) => {
  console.log(params.username);
  File.findOne({ 'meta.username': params.username }, (err, file) => {
    if (err) return cb(err);
    for (let i = 0; i < file.data.length; i++) {
      if (file.data[i].searchName === params.searchName) {
        file.data.splice(i, 1);
        break;
      }
    }
    file.save((err, response) => {
      const result = {
        successfully_deleted: false
      };
      if (err) return cb(null, result);
      result.successfully_deleted = true;
      cb(null, result);
      return true;
    });
  });
};

export const addLinkedin = (params, cb) => {
  console.log(params.username);
  File.findOne({ 'meta.username': params.username }, (err, file) => {
    console.log(file);
    if (err) return cb(err);
    const algorithm = 'aes256';
    const key = 'password';
    const passwordKey = params.password;
    const cipher = crypto.createCipher(algorithm, key);
    const encrypted = cipher.update(passwordKey, 'utf8', 'hex') + cipher.final('hex');
    console.log(encrypted);
    file.meta.linkedin.email = params.email;
    file.meta.linkedin.password = encrypted;
    file.save((err, response) => {
      console.log(response);
      const result = {
        successfully_updated: false
      };
      if (err) return cb(null, result);
      result.successfully_updated = true;
      cb(null, result);
      return true;
    });
  });
};

export const addFile = (params, cb) => {
  let result = {};
  console.log(params.meta.username);
  File.findOne({ 'meta.username': params.meta.username }, (err, file) => {
    console.log(file);
    if (file === null) {
      const newFile = new File(params);
      newFile.save((err, response) => {
        console.log(response);
        result = {
          successfully_created: false
        };
        if (err) return cb(null, result);
        result.successfully_created = true;
        cb(null, result);
        return true;
      });
    }
    else {
      params.data[0].leadCount = 0;
      params.data[0].dataIndex = file.data.length;
      file.data.push(params.data[0]);
      file.save((err, response) => {
        console.log(response);
        const result = {
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

export const saveFile = (params, cb) => {
  let result = {};
  console.log(params.meta.username);
  File.findOne({ 'meta.username': params.meta.username }, (error, file) => {
  	console.log(file);
    if (file === null) {
      const newFile = new File(params);
      newFile.save((err, response) => {
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
      const index = params.data[0].dataIndex;
      file.data[index].totalSearch = params.data[0].totalSearch;
      file.data[index].profileVisit = params.data[0].profileVisit;
      file.data[index].lastPage = params.data[0].lastPage;
      file.data[index].leadCount = params.data[0].leadCount;
      //file.meta.lastPage = params.meta.lastPage;
      console.log(params.data[0].totalSearch);
      file.save((err, response) => {
        	      console.log(response);
                console.log(err);
        	      const result = {
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