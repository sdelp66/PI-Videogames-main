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

  let gamesDBprom, responseAPIprom, responseAPIprom2, responseAPIprom3;

  //console.log("name>>>> ", name);

  if (name) {
    gamesDBprom = await Videogame.findAll({
      where: {
        name
      },
      include: [{
        model: Genero,
      }],
      limit: 15
    });
    responseAPIprom = await axios.get(`https://api.rawg.io/api/games?key=${MY_API_KEY}&page_size=15&search=${name}`);
    //externalData = response.data.results;
  } else {
    gamesDBprom = await Videogame.findAll({
      include: [{
        model: Genero,
      }],
    });
    responseAPIprom = await axios.get(`https://api.rawg.io/api/games?key=${MY_API_KEY}&page_size=40`); //ojo aqui a pesar del pagesize de 100 viene solo 40 entonces hay q pedir otras pages para llegar a 100... (1 + de 40 y otra de 20?) 
    responseAPIprom2 = await axios.get(`https://api.rawg.io/api/games?key=${MY_API_KEY}&page=2&page_size=40`); //ojo aqui a pesar del pagesize de 100 viene solo 40 entonces hay q pedir otras pages para llegar a 100... (1 + de 40 y otra de 20?) 
    responseAPIprom3 = await axios.get(`https://api.rawg.io/api/games?key=${MY_API_KEY}&page=3&page_size=20`); //quien dice 100 dice 100 40+40+20...
    //externalData = response.data.results;
  }
  
  let gamesDB, responseAPI, responseAPI2,responseAPI3;
  let externalDataAPI = [];
  if (responseAPIprom2 === undefined) { 
     [gamesDB, responseAPI] = await Promise.all([gamesDBprom, responseAPIprom]);
     externalDataAPI = responseAPI.data.results;
  }else {
     [gamesDB, responseAPI, responseAPI2, responseAPI3 ] = await Promise.all([gamesDBprom, responseAPIprom, responseAPIprom2, responseAPIprom3]);
     externalDataAPI = externalDataAPI.concat(responseAPI.data.results,responseAPI2.data.results, responseAPI3.data.results );
  }
  
  //externalDataAPI = externalDataAPI.concat(responseAPI.data.results,responseAPI2.data.results, responseAPI3.data.results );
  //responseAPI.data.results; //aqui vienen mmmuuuuuuuchos datos solo necesito los de la ruta ppal...

  if (!gamesDB.length && !externalDataAPI.length) {
    return res.status(404).send({ message: 'No se encontraron videojuegos' });
  }

  const gamesAPI = externalDataAPI.map(vg => ({
    id: vg.id,
    name: vg.name,
    imagen: vg.background_image,
    generos: vg.genres,
    //description: vg. //estos en el ppal no hacen falta,,,
    // fechaLanzamiento: vg.released,
    // rating: vg.rating,
    // plataformas: vg.plataforms
  }))


  /**
 * Ruta de detalle de videojuego: debe contener

[ ] Los campos mostrados en la ruta principal para cada videojuegos (imagen, nombre, y géneros)
[ ] Descripción
[ ] Fecha de lanzamiento
[ ] Rating
[ ] Plataformas
 */
const cantidadJuegosAPI= gamesAPI.length;

console.log("cantidadJuegosAPI >>>>>>>>>>",cantidadJuegosAPI);

let todosJuntos = [];

todosJuntos = todosJuntos.concat(gamesDB,gamesAPI);



  res.send({ todosJuntos, cantidadJuegosAPI});

  
});



// // GET /videogame/{idVideogame}
router.get('/videogame/:id', async (req, res) => {
  const id = req.params.id;

  console.log(" id---- >>", id);
  if (id.length>6){
    gamesDBprom = await Videogame.findByPk(id); //1ro veo si lo tengo en mi DB + rápido...
    if (gamesDBprom) return res.send({ gamesDBprom });
  }

  //sino lo busco en los 100 de la DB // revisar esto si conviene hacerlo asi o traer todo en la 1er consulta y mantener los 100 en memoria para luego consultarlos aqui?

  // GET https://api.rawg.io/api/games/{id}

  responseAPIprom = await axios.get(`https://api.rawg.io/api/games/id?key=${MY_API_KEY}`);
  
  externalDataAPI = responseAPIprom.data; // ojo aqui es un objeto?

  // const gamesAPI = externalDataAPI.map(vg => ({ // le puedo meter map a esto? NO!!
  //   id: vg.id,
  //   name: vg.name,
  //   imagen: vg.background_image,
  //   generos: vg.genres,
  //   description: vg.description,
  //   fechaLanzamiento: vg.released,
  //   rating: vg.rating,
  //   plataformas: vg.plataforms
  // }));

  const {
        name,
        background_image,
        genres,
        description,
        released,
        rating,
        plataforms } = externalDataAPI;

  const gamesAPI = {id,
                  name,
                  imagen: background_image, 
                  description,
                  fechaLanzamiento: released,
                  rating,
                  plataforms
                  }



  if (gamesAPI) return res.send({ gamesAPI });

  return res.status(404).send({ message: `No se encontraron videojuegos con id: ${id} ` });

});
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



router.post('/videogames', async (req, res) => {
    const { name, description, plataformas, generos } = req.body; //los generos viene x name en 1 array...ojo q le meti 1 genero no 1 array de generos...otra los generos tienen q estar en el genre de la api...
    //console.log("name>>> ",name);
    const game = new Videogame({ name, description, plataformas }); //si lo mando con genero no lo tengo q crer aqui o si?

    //console.log("game >>>>", game);
    //const game = Videogame.build({ name, description, plataformas }); //ojo no estoy poniendo genres por ahora
  
    try {
        await createVideogameWithGenre(game, generos); // aqui va sin el await pq lo tengo en la funcion createVideogameWithGenre?
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
