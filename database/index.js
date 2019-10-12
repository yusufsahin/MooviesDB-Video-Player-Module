let sampleData = require('./data.js');

const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID
mongoose.connect('mongodb://localhost/moovies');


const mooviesSchema = mongoose.Schema({
  id: ObjectId,
  title: String,
  trailer_title: String,
  description: String,
  running_time: Number,
  date: Date,
  ratings: Number,
  thumbnail_url: String,
  video_url: String,
})

const Moovie = mongoose.model('Moovie', mooviesSchema);



const save = function(arr, callback) {
  let data = arr.map(function(item) {
    return new Moovie({
      id: item.id,
      title: item.title,
      description: item.description,
      running_time: item.running_time,
      date: item.date,
      ratings: item.ratings,
      thumbnail_url: item.thumbnail_url,
      video_url: item.video_url
    })
  }).forEach(item => item.save((err, success) => {
    if (err) {
      callback(err)
    } else {
      callback(null, success)
    }
  }))
}

