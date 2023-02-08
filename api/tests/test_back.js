// In this example we are testing the GET endpoint for getting all video games.

const request = require('supertest');
const app = require('../app');

describe('GET /videoGames', () => {
it('should return an array of video games', async () => {
const res = await request(app).get('/videoGames');

expect(res.statusCode).toEqual(200);
expect(res.body).toBeInstanceOf(Array);
expect(res.body[0]).toHaveProperty('id');
expect(res.body[0]).toHaveProperty('name');
expect(res.body[0]).toHaveProperty('imagen');
expect(res.body[0]).toHaveProperty('description');
expect(res.body[0]).toHaveProperty('fechaLanzamiento');
expect(res.body[0]).toHaveProperty('rating');
expect(res.body[0]).toHaveProperty('plataforms');

});
});

// In this example we are testing the GET endpoint for getting a single video game.

describe('GET /videoGames/:id', () => {
it('should return a single video game', async () => {
const res = await request(app).get('/videoGames/some-id');

expect(res.statusCode).toEqual(200);
expect(res.body).toHaveProperty('id');
expect(res.body).toHaveProperty('name');
expect(res.body).toHaveProperty('imagen');
expect(res.body).toHaveProperty('description');
expect(res.body).toHaveProperty('fechaLanzamiento');
expect(res.body).toHaveProperty('rating');
expect(res.body).toHaveProperty('plataforms');


});
});

// In this example we are testing the POST endpoint for creating a new video game.

describe('POST /videoGames', () => {
it('should create a new video game', async () => {
const res = await request(app)
.post('/videoGames')
.send({
name: 'Super Mario Bros.',
imagen: 'https://some-image-url.com/super-mario-bros.jpg',
description: 'A classic platformer game',
fechaLanzamiento: '1985-09-13',
rating: 9,
plataforms: ['Nintendo Entertainment System']
});

expect(res.statusCode).toEqual(201);
expect(res.body).toHaveProperty('id');
expect(res.body).toHaveProperty('name', 'Super Mario Bros.');
expect(res.body).toHaveProperty('imagen', 'https://some-image-url.com/super-mario-bros.jpg');
expect(res.body).toHaveProperty('description', 'A classic platformer game');
expect(res.body).toHaveProperty('fechaLanzamiento', '1985-09-13');
expect(res.body).toHaveProperty('rating', 9);
expect(res.body).toHaveProperty('plataforms', ['Nintendo Entertainment System']);

});
});

