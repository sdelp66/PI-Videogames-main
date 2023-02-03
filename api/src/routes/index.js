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
const { createVideogameWithGenre, findOrCreateDBGenre } = require('../controlers/index');
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


  const {
        name,
        background_image,
        genres,
        description,
        released,
        rating,
        plataforms } = externalDataAPI; //destructuring para sacar las propiedades que necesito de los objetos q vienen

  const gamesAPI = {id, // con esas propiedades armo lo que quiero devolver...
                  name,
                  imagen: background_image, 
                  description,
                  fechaLanzamiento: released,
                  rating,
                  plataforms
                  }
// de que otra forma puedo tomar solo las propiedades que vienen y filtrar solo las que necesito?


  if (gamesAPI) return res.send({ gamesAPI });

  return res.status(404).send({ message: `No se encontraron videojuegos con id: ${id} ` });

});


// POST de videogame con genero...

router.post('/videogames', async (req, res) => {
    const { name, description, plataformas, generos } = req.body; //los generos viene x name en 1 array..otra los generos tienen q estar en el genre de la api...
    //console.log("name>>> ",name);
    const game = new Videogame({ name, description, plataformas }); 

  
    try {
        await createVideogameWithGenre(game, generos); 
      //await game.save(); // al parecer aqui no....
      res.send({ message: 'Videojuego creado con éxito' });
    } catch (err) {
      res.status(500).send({ message: err });
    }
  });

  
// GET generos...
/**
 * [ ] GET /genres:
Obtener todos los tipos de géneros de videojuegos posibles
En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
 * 
 */
router.get('/genres', async (req, res) => {

  try {
    const generos = await findOrCreateDBGenre()
    res.send(generos);
  } catch (error) {
    res.status(500).send({ message: error });
  }
    
  });

module.exports = router;
