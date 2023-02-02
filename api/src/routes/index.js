//const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


//const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
require('dotenv').config();

const {  MY_API_KEY } = process.env;
const express = require('express');
const router = express.Router();
const { Videogame, Genero } = require('../db');
const createVideogameWithGenre = require('../controlers/index');
const axios = require('axios');

router.get('/videogames', async (req, res) => {
  const { name } = req.query;
  let games;

  console.log("name>>>> ", name);

  if (name) {
    games = await Videogame.findAll({
      where: {
        name
      },
      include: [{
        model: Genero,
      }],
      limit: 15
    });
  } else {
    games = await Videogame.findAll({
      include: [{
        model: Genero,
      }],
    });
  }

//   if (!games.length) {
//     return res.status(404).send({ message: 'No se encontraron videojuegos' });
//   }

  const response = await axios.get(`https://api.rawg.io/api/games?key=${MY_API_KEY}&page_size=15&search=${name}`);
  const externalData = response.data.results;

  res.send({ games, externalData });
});


// router.get('/videogames', async (req, res) => {
//     const { name } = req.query;
//     let games;

//     console.log("name>>>> ", name);
  
//     if (name) {
//       games = await Videogame.findAll({
//         where: {
//           name
//         },
//         include: [{
//             model: Genero,
//             }],
//         limit: 15
//       });
//     } else {
//       games = await Videogame.findAll({
//         include: [{
//         model: Genero,
//         }],
//         });
//     }
  
//     if (!games.length) {
//       return res.status(404).send({ message: 'No se encontraron videojuegos' });
//     }
  
//     res.send(games);
//   });

// // GET /videogames?name="..."
// router.get('/videogames', (req, res) => {
//   const name = req.query.name;
//   if (!name) {
//     return res.status(400).json({ error: 'Missing required parameter "name".' });
//   }

//   Videogame.findAll({
//     where: {
//       nombre: {
//         [Op.like]: `%${name}%`
//       }
//     },
//     limit: 15,
//     attributes: ['id', 'nombre', 'descripcion', 'fechaLanzamiento', 'rating']
//   })
//   .then(videogames => {
//     if (!videogames.length) {
//       return res.status(404).json({ error: 'No videogames found with name containing the provided parameter.' });
//     }
//     res.json(videogames);
//   })
//   .catch(error => {
//     res.status(500).json({ error: error.message });
//   });
// });

// // GET /videogame/{idVideogame}
// router.get('/videogame/:id', (req, res) => {
//   const id = req.params.id;

//   Videogame.findOne({
//     where: { id },
//     include: [{
//       model: Genero,
//       as: 'generos'
//     }],
//     attributes: ['id', 'nombre', 'descripcion', 'fechaLanzamiento', 'rating']
//   })
//   .then(videogame => {
//     if (!videogame) {
//       return res.status(404).json({ error: 'Videogame not found.' });
//     }
//     res.json(videogame);
//   })
//   .catch(error => {
//     res.status(500).json({ error: error.message });
//   });
// });

// // POST /videogames
// router.post('/videogames', async (req, res) => {
//   const { name, releaseDate, genres } = req.body;
//   try {
//     const videogame = await Videogame.create({ name, releaseDate });
//     if (genres && genres.length) {
//       const genresInstances = await Genre.findAll({
//         where: {
//           id: { [Op.in]: genres },
//         },
//       });
//       await videogame.addGenres(genresInstances);
//     }
//     return res.json(videogame);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });


router.post('/videogames', async (req, res) => {
    const { name, description, plataformas, genero } = req.body; //el genero viene x name sin chequeo de q puede venir accion, acion o acción y son 3 generos #...
    //console.log("name>>> ",name);
    const game = new Videogame({ name, description, plataformas }); //si lo mando con genero no lo tengo q crer aqui o si?

    //console.log("game >>>>", game);
    //const game = Videogame.build({ name, description, plataformas }); //ojo no estoy poniendo genres por ahora
  
    try {
        await createVideogameWithGenre(game, genero); // aqui va sin el await pq lo tengo en la funcion createVideogameWithGenre?
      //await game.save(); // al parecer aqui no....
      res.send({ message: 'Videojuego creado con éxito' });
    } catch (err) {
      res.status(500).send({ message: err });
    }
  });

  

// router.get('/genres', async (req, res) => {
//     const genres = await Genre.find();
//     res.send(genres);
//   });



module.exports = router;
