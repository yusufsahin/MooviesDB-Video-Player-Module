const mongoose = require('mongoose');
const server = require('../server/index.js');
const request = require('supertest')('http://localhost:3000');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


beforeAll((done) => {
  mongoose.connect('mongodb://localhost/moovies');
  server.start();
  done();
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
        .end(done)
        })
  it('Should return an array of length greater than 0', (done) => {
    request.get('/api/videoplayer/data')
      .expect(200)
      .expect(res => res.body.length > 0)
      .end(done)
  })
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
    })
  })
})

