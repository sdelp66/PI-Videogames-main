require('dotenv').config();

const {  MY_API_KEY } = process.env;
const express = require('express');
const router = express.Router();
const { Videogame, Genero } = require('../db');
const { createVideogameWithGenre, findOrCreateDBGenre } = require('../controlers/index');
const axios = require('axios');
const { Op } = require('sequelize');

router.get('/videogames', async (req, res) => {
  const { name } = req.query;

  let gamesDBprom, responseAPIprom, responseAPIprom2, responseAPIprom3;

  //console.log("name>>>> ", name);
  try {
    if (name) {
      try {
        
        gamesDBprom = await Videogame.findAll({
          where: {
          name: {
          [Op.like]: `%${name}%`
          }
          },
          include: [{
          model: Genero,
          }],
          limit: 15
          });
          
      } catch (error) {
        console.error(error);
      }
      
       // esto no taria los juegos q tenian esa palabra         
      // gamesDBprom = await Videogame.findAll({
      //   where: {
      //     name
      //   },
      //   include: [{
      //     model: Genero,
      //   }],
      //   limit: 15
      // });
      responseAPIprom = await axios.get(`https://api.rawg.io/api/games?key=${MY_API_KEY}&page_size=15&search=${name}`);
      //externalData = response.data.results;
    } else {
      gamesDBprom = await Videogame.findAll({
        include: [{
          model: Genero,
        }],
      });
      responseAPIprom = await axios.get(`https://api.rawg.io/api/games?key=${MY_API_KEY}&page_size=40`); //ojo aqui a pesar del pagesize de 100 viene solo 40 entonces hay q pedir otras pages para llegar a 100... (1 + de 40 y otra de 20?) 
      responseAPIprom2 = await axios.get(`https://api.rawg.io/api/games?key=${MY_API_KEY}&page=6&page_size=40`); //ojo aqui a pesar del pagesize de 100 viene solo 40 entonces hay q pedir otras pages para llegar a 100... (1 + de 40 y otra de 20?) 
      responseAPIprom3 = await axios.get(`https://api.rawg.io/api/games?key=${MY_API_KEY}&page=10&page_size=20`); //quien dice 100 dice 100 40+40+20...
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
      return res.status(500).send({ message: 'No se encontraron videojuegos' });
    }
  
    const gamesAPI = externalDataAPI.map(vg => ({
      id: vg.id,
      name: vg.name,
      imagen: vg.background_image,
      generos: vg.genres,
      rating: vg.rating,
    }))
  
  
  //const cantidadJuegosAPI= gamesAPI.length;
  
  //console.log("gamesAPI --->> ", gamesAPI);
  let todosJuntos = [];
  
  todosJuntos = todosJuntos.concat(gamesDB,gamesAPI);
  
  
  
    res.send({ todosJuntos});
    
  } catch (error) {

    res.status(500).send({ message: error})
    
  }
  

  
});



// // GET /videogame/{idVideogame}
router.get('/videogame/:id', async (req, res) => {
  const id = req.params.id;

  //console.log(" id---- >>", id);
  if (id.length>6){
    gamesDBprom = await Videogame.findByPk(id,{include: [{
      model: Genero,
      }]}); //1ro veo si lo tengo en mi DB + rápido...
    // puff lo tengo q convertir a lo mismo q mando si viene de la api (por no haberle puesto los mismos nombres y estructura...)
    let videoDB = {
      id:gamesDBprom.id,
      name: gamesDBprom.name,
      background_image: gamesDBprom.background_image,
      description: gamesDBprom.description,
      released: gamesDBprom.fechaLanzamiento,
      rating: gamesDBprom.rating,
      platformas: gamesDBprom.plataformas.toString(),
      generos: gamesDBprom.generos.map(g => g.name).join(', '),
    }
    if (gamesDBprom) return res.json(videoDB);
  }

  //sino lo busco en los 100 de la DB // revisar esto si conviene hacerlo asi o traer todo en la 1er consulta y mantener los 100 en memoria para luego consultarlos aqui?

  // GET https://api.rawg.io/api/games/{id}

  const responseAPIprom = await axios.get(`https://api.rawg.io/api/games/${id}?key=${MY_API_KEY}`);
  
  const externalDataAPI = responseAPIprom.data; // ojo aqui es un objeto?  hay q extraer antes los generos y plataformas?

  // console.log( "externalDataAPI ---> ",  externalDataAPI);
 
  let generos = externalDataAPI.genres.map(g => g.name).join(', ');
  let platformas = externalDataAPI.platforms.map(g => g.platform.name).join(', ');
  // y retorno con los campos requeridos
  let videogameDetails = {
    id: externalDataAPI.id,
    name: externalDataAPI.name,
    background_image: externalDataAPI.background_image,
    description: externalDataAPI.description_raw,
    released: externalDataAPI.released,
    rating: externalDataAPI.rating,
    platformas,
    generos
  };

  if (videogameDetails) return res.json(videogameDetails);

  return res.status(404).send({ message: `No se encontraron videojuegos con id: ${id} ` });

});


// POST de videogame con genero...

router.post('/videogames', async (req, res) => {
    const { name, description, plataformas, generos, fechaLanzamiento, rating } = req.body; //los generos viene x name en 1 array..otra los generos tienen q estar en el genre de la api...
    //console.log("name>>> ",name);
    // convierto pra letra del name a mayuscula  (x si viene minus y despues afecta ordenamiento)
    const primaLetra = name.charAt(0).toUpperCase();
    const enMayuscula1ra = primaLetra + name.slice(1); 
    const background_image = 'https://img.freepik.com/fotos-premium/retrato-jugador-jugueton-loco-que-disfruta-jugando-videojuegos_194143-416.jpg';
    const game = new Videogame({ name: enMayuscula1ra, description, plataformas, fechaLanzamiento, rating, background_image }); 

  
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
