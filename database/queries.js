const mongoose = require('mongoose');
const moovies = require('./seed.js');

const get = (callback) =>  {
  moovies.Moovie.find({}, (err, docs) => {
    if (err) {
      callback(err);
    } else {
      callback(null, docs);
    }
  });
};

const getById = (id, callback) => {
  moovies.Moovie.find({_id: id}, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
    }
  });
};

const rateMoovie = (selected, ip, rating, callback) => {
  moovies.Moovie.findOne({ _id: selected }, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      if (doc.yourRating.some(item => item[0] === ip)) {
        console.log("you already rated this");
        callback(null, "you already rated this")
      } else {
        moovies.Moovie.findOneAndUpdate({ _id: selected }, { $push: { yourRating: [[ip, rating]] }, $set: { averageRating: Math.round(((Number(doc.averageRating) * Number(doc.ratings) + Number(rating)) / (Number(doc.ratings) + 1)) * 10) / 10, ratings: Number(doc.ratings) + 1 } }, { new: true }, (err, doc) => {
          if (err) {
            callback(err);
          } else {
            callback(null, doc);
          }
        });
      }
    }
  });
};

module.exports = { get, getById, rateMoovie };
