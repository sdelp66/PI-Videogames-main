//const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


//const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const express = require('express');
const router = express.Router();
const { Videogame, Genero } = require('../db');


router.get('/videogames', async (req, res) => {
    const { name } = req.query;
    let games;

    console.log("name>>>> ", name);
  
    if (name) {
      games = await Videogame.findAll({
        where: {
          name
        },
        limit: 15
      });
    } else {
      games = await Videogame.findAll();
    }
  
    if (!games.length) {
      return res.status(404).send({ message: 'No se encontraron videojuegos' });
    }
  
    res.send(games);
  });

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
    const { name, description, plataformas } = req.body; //ojo no estoy poniendo genres por ahora
    //console.log("name>>> ",name);
    const game = new Videogame({ name, description, plataformas }); //ojo no estoy poniendo genres por ahora
    console.log("game >>>>", game);
    //const game = Videogame.build({ name, description, plataformas }); //ojo no estoy poniendo genres por ahora
  
    try {
      await game.save();
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