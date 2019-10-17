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
  moovies.Moovie.find({_id: id}, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
    }
  })
};

const rateMoovie = (selected, ip, rating, callback) => {
  moovies.Moovie.findOne({_id: selected.id}, (err, doc) => {
    if (err) {
      callback(err);
    } else {
        if (doc.ip) {
          moovies.Moovie.findOneAndUpdate({_id: selected.id}, {yourRating: rating}, {new: true}, (err, doc) => {
            if (err) {
              callback(err);
            } else {
              callback(null, doc)
            }
          })
        } else {
          moovies.Moovie.findOneAndUpdate({_id: selected.id}, {yourRating: rating, averageRating: ((doc.averageRating * doc.ratings + rating )/(doc.ratings + 1)) ratings: doc.ratings++}, {new: true}, (err, doc) => {
            if (err) {
              callback(err);
            } else {
              callback(null, doc);
            }
          })
        }
    }
  })
}

module.exports = { get, getById, rateMoovie };
