const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/queries.js');
const app = express();
const port = 3000;

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get('/api/videoplayer/data', (req, res) => {
  db.get((err, docs) => {
    if (err) {
      res.sendStatus(404)
    } else {
      res.send(docs);
    }
  })
})

app.get('/api/videoplayer/data/:id', (req, res) => {
  db.getById(req.params.id, (err, doc) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.send(doc);
    }
  })
})

app.put('/api/videoplayer/data/:id//:rating', (req, res) => {
  db.rateMoovie(req.params.id, req.ip, req.params.rating, (err, doc) => {
    if (err) {
      res.status(400).send(err);
    } else {
      db.get((err, docs) => {
        if (err) {
          res.status(404).send(err);
        } else {
          res.status(202).send(docs);
        }
      })
    }
  })
})

// const rateMoovie = (selected, ip, rating, callback) => {
//   moovies.Moovie.findOne({_id: selected.id}, (err, doc) => {
//     if (err) {
//       callback(err);
//     } else {
//         if (doc.ip) {
//           moovies.Moovie.findOneAndUpdate({_id: selected.id}, {yourRating: rating}, {new: true}, (err, doc) => {
//             if (err) {
//               callback(err);
//             } else {
//               callback(null, doc)
//             }
//           })
//         } else {
//           moovies.Moovie.findOneAndUpdate({_id: selected.id}, {yourRating: rating, averageRating: ((doc.averageRating * doc.ratings + rating )/(doc.ratings + 1)) ratings: doc.ratings++}, {new: true}, (err, doc) => {
//             if (err) {
//               callback(err);
//             } else {
//               callback(null, doc);
//             }
//           })
//         }
//     }
//   })
// }


app.listen(port, () => {console.log(`listening on port ${port}`)})