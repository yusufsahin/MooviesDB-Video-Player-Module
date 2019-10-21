const mongoose = require('mongoose');
const server = require('../server/index.js');
const seed = require('./seed.js');
const sampleData = require('./data.js').sampleData;
const request = require('supertest')('http://localhost:3000');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


beforeAll((done) => {
  seed.seed(sampleData, (err) => {
    if (err) {
      done(err)
    } else {
      mongoose.connect('mongodb://localhost/moovies');
      server.start();
      done();
    }
  })
});

afterAll((done) => {
  mongoose.disconnect();
  server.close();
  done();
});

describe('Communicate with server', () => {
  it('Should make get requests to the server', (done) => {
      request.get('/api/videoplayer/data')
        .expect(200)
        .end(done);
        });

  it('Should return an array of length greater than 0', (done) => {
    request.get('/api/videoplayer/data')
      .expect(200)
      .expect(res => res.body.length > 0)
      .end(done);
  });

  it('Should return an array with a length of 27', (done) => {
    request.get('/api/videoplayer/data')
      .expect(200)
      .expect(res => res.body.length === 27)
      .end(done);
  });

  it('Entries should have the correct properties', (done) => {
    request.get('/api/videoplayer/data')
      .expect(200)
      .expect((res) => {
        expect(res.body[0]).toHaveProperty('_id');
        expect(res.body[0]).toHaveProperty('title');
        expect(res.body[0]).toHaveProperty('description');
        expect(res.body[0]).toHaveProperty('running_time');
        expect(res.body[0]).toHaveProperty('date');
        expect(res.body[0]).toHaveProperty('ratings');
        expect(res.body[0]).toHaveProperty('averageRating');
        expect(res.body[0]).toHaveProperty('yourRating');
        expect(res.body[0]).toHaveProperty('thumbnail_url');
        expect(res.body[0]).toHaveProperty('video_url');
      })
      .end(done);
  });

  it('Should fetch a movie based on id', (done) => {
    request.get('/api/videoplayer/data')
    .expect(200)
    .end((err, res) => {
      if (err) { return done(err) }
      request.get('/api/videoplayer/data/' + res.body[0]._id)
        .expect(200)
        .expect((res) => {
          expect(res.body.length).toBe(1)
        })
        .end(done);
    });
  });
})

describe('It should add a rating to a movie', () => {
  let id;
  let rating = 7;
  let totalRatingsBeforeRating;
  it('Should begin with no added user ratings', (done) => {
    request.get('/api/videoplayer/data/')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          id = res.body[0]._id;
          request.get(`/api/videoplayer/data/${id}`)
            .expect(200)
            .expect((res) => {
              totalRatingsBeforeRating = res.body[0].ratings
              expect(res.body.length).toBe(1);
              expect(res.body[0].yourRating.length).toBe(0);
            })
            .end(done);
        }
      });
  });

  it('Should show the added user rating and increase total ratings by one', (done) => {
    request.get(`/api/videoplayer/data/${id}/${rating}`)
      .expect(202)
      .expect((res) => {
        expect(res.body[0].yourRating.length).toBe(1)
        expect(res.body[0].ratings).toBe(totalRatingsBeforeRating + 1)
      })
      .end(done)
  });

  it('should not increase total ratings when a user has already rated', (done) => {
    request.get(`/api/videoplayer/data/${id}/${rating}`)
      .expect(202)
      .expect((res) => {
        expect(res.body[0].ratings).toBe(totalRatingsBeforeRating + 1);
      })
      .end(done);
  });
})

