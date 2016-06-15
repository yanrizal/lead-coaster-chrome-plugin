import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  data:[{
	  username: { type: String },
	  urlSearch: { type: String },
	  totalSearch: { type: String },
	  profileVisit: { type: Array }
	}],
	meta:{
	  lastPage: { type: Number }
	}
});

const File = mongoose.model('File', fileSchema, 'file');

export const saveFile = (params, cb) => {
  let result = {};
  console.log(params.data[0].username);
  File.findOne({ 'data.username': params.data[0].username }, (error, file) => {
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
      file.data[0] = params.data[0];
      file.meta.lastPage = params.meta.lastPage;
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