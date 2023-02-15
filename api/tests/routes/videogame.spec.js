/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
  description: "el test",
  plataformas: ["PS", "Xbox"]
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe('GET /videogames', () => {
    it('should get 200', function(done) {
      this.timeout(10000); // aumenta el tiempo de espera a 10000ms
      agent.get('/videogames')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });   
  });
});
