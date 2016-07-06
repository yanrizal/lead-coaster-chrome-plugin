import { saveFile, findFile, addFile, addLinkedin, deleteFile } from '../models/file';

//fileController

export const getData = (req, res) => {
  const params = {
	username: req.body.lkdUsername
  };
  findFile(params, (err, response) => {
	console.log(response);
	res.json(response);
  });
}

export const saveData = (req, res) => {
  const params = {
    data:[{
      urlSearch: req.body.urlSearch,
      totalSearch: req.body.totalSearch,
      profileVisit: req.body.dataProfile,
      leadCount: req.body.leadCount,
      dataIndex: req.body.dataIndex,
      searchName: req.body.searchName,
      lastPage: req.body.page
    }],
    meta:{
      username: req.body.lkdUsername,
      linkedin: {
        email: '',
        password: ''
      }
    }
  };
  saveFile(params, (err, response) => {
    console.log(response);
    res.json(response);
  });
}

export const addData = (req, res) => {
  const params = {
    data:[{
      urlSearch: req.body.urlSearch,
      totalSearch: '0',
      profileVisit: [],
      leadCount: 0,
      dataIndex: 0,
      searchName: req.body.searchName,
      lastPage: 0
    }],
    meta:{
      username: req.body.username,
      linkedin: {
        email: '',
        password: ''
      }
    }
  };
  addFile(params, (err, response) => {
    console.log(response);
    res.json(response);
  });
}

export const linkedinSave = (req, res) => {
  const params = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };
  addLinkedin(params, (err, response) => {
    console.log(response);
    res.json(response);
  });
}

export const deleteData = (req, res) => {
  const params = {
    dataIndex:req.body.dataIndex,
    username:req.body.username
  };
  deleteFile(params, (err, response) => {
    console.log(response);
    res.json(response);
  });
}



