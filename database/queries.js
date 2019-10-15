const mongoose = require('mongoose');
const moovies = require('./seed.js');

const get = (callback) =>  {
  moovies.Moovie.find({}, (err, docs) => {
    if (err) {
      callback(err);
    } else {
      callback(null, docs);
    }
  })
};

const getById = (id, callback) => {
  moovies.Moovie.find({_id: id}, (err, docs) => {
    if (err) {
      callback(err);
    } else {
      callback(null, docs);
    }
  })
};

module.exports = { get, getById };