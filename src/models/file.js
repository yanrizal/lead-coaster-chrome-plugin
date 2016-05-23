import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  fileId: { type: String },
  name: { type: String },
  status: { type: Number },
  userId: { type: String }
});

const File = mongoose.model('File', fileSchema, 'file');

export const findUserFile = (params, cb) => {
  File.find(params, (err, file) => {
    if (err) return cb(err);
    cb(null, file);
    return true;
  });
};

export const deleteFile = (params, cb) => {
  File.find(params).remove((err, response) => {
    console.log(response);
    const result = {
      successfully_deleted: false
    };
    if (err) return cb(null, result);
    result.successfully_deleted = true;
    cb(null, result);
    return true;
  });
};


export const updateFile = (params, cb) => {
  File.findOne({ fileId: params.fileId }, (error, file) => {
    file.status = params.status;
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

export const saveFile = (params, cb) => {
  let result = {};
  File.findOne({ fileId: params.fileId }, (error, file) => {
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
      result = {
        file_already_exist: true
      };
      cb(null, result);
      return true;
    }
  });
};
