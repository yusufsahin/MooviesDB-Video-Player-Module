const data = require('./data.js');
const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/moovies');


const mooviesSchema = mongoose.Schema({
  title: String,
  trailer_title: String,
  description: String,
  running_time: Number,
  date: String,
  ratings: Number,
  thumbnail_url: String,
  video_url: String,
});

const Moovie = mongoose.model('Moovie', mooviesSchema);

const seed = function(arr, callback) {
  let data = arr.map(function(item) {
    return new Moovie({
      title: item.title,
      description: item.description,
      running_time: item.running_time,
      date: item.date,
      ratings: item.ratings,
      averageRating: item.averageRating,
      thumbnail_url: item.thumbnail_url,
      video_url: item.video_url
    })
  })

  Moovie.deleteMany({}, (err) => {
    if (err) {
      callback(err)
    } else {
      Moovie.insertMany(data, (err, docs) => {
        if (err) {
          callback(err);
        } else {
          callback(null, docs);
        }
      })
    }

  })
}



seed(data.sampleData, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Data successfully seeded.')
  }
})

module.exports = { mooviesSchema, Moovie, seed }

