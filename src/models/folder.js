import mongoose from 'mongoose';
import md5 from 'md5';

const folderSchema = new mongoose.Schema({
  userId: { type: String },
  folderName: { type: String },
  file: [{
    name: { type: String },
    dom: { type: String },
    fileId: { type: String },
    fileIcon: { type: String }
  }],
  moduleType: { type: String }
});

const Folder = mongoose.model('Folder', folderSchema, 'folder');

export const findFolder = (params, cb) => {
  Folder.find(params, (err, folder) => {
    if (err) return cb(err);
    cb(null, folder);
    return true;
  });
};

export const deleteFolder = (params, cb) => {
  Folder.find(params).remove((err, response) => {
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

export const findOne = (params, cb) => {
  const md5File = [];
  const fileArray = params.file;
  if (fileArray.length >= 1) {
    fileArray.map((data) => {
      const newFile = {
        name: md5(data.fileName),
        dom: data.fileNode,
        fileId: data.fileId,
        fileIcon: data.fileIcon
      };
      md5File.push(newFile);
      return true;
    });
  }
  Folder.findOne({ userId: params.userId, folderName: params.folderName }, (error, folder) => {
    if (folder === null) {
      params.file = md5File;
      const newFolder = new Folder(params);
      newFolder.save((err, response) => {
        console.log(response);
        const result = {
          successfully_created: false
        };
        if (err) return cb(null, result);
        result.successfully_created = true;
        cb(null, result);
        return true;
      });
    } else {
      folder.file = md5File;
      folder.save((err, response) => {
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
