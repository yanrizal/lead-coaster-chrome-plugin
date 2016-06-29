import mongoose from 'mongoose';

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
    username: { type: String }
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

export const addFile = (params, cb) => {
  console.log(params.meta.username);
  File.findOne({ 'meta.username': params.meta.username }, (err, file) => {
    console.log(file);
    params.leadCount = '0';
    params.dataIndex = file.data.length;
    if (file === null) {
    file.data.push(params);
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
    else {
      const index = params.data[0].dataIndex;
      file.data[index].totalSearch = params.data[0].totalSearch;
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