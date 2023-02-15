require('dotenv').config();

const {  MY_API_KEY } = process.env;

const Sequelize = require('sequelize');
const { Videogame, Genero, sequelize } = require('../db');
const axios = require('axios');


async function createVideogameWithGenre(videogame, generosNames) { // hay q trer los generos de la BD y usarlos alli... NO CREAR NVOS GENEROS!!
    let createdGenre; 
    // generosNames ej [action, shoot ]
    // traigo todos los generos de la API la 1ra vez => q la tabla de generos esta vacia
    let existingGenre = await Genero.findAll();
    //console.log("existingGenre ----->> ",existingGenre);
    //console.log("existingGenre.length ----->> ",existingGenre.length);
    if(existingGenre.length === 0){
      //console.log("antes de generosAPI ---- >>>>");
      try {
      const generosAPI = await axios.get(`https://api.rawg.io/api/genres?key=${MY_API_KEY}`);
      //console.log("generosAPI ---- >>>>", generosAPI);
      //const generosParaDB = generosAPI.data.results.map((g) => g.name); // esto esta mal pq tienen q ser objetos {name} verlo depues
      // evito convertir 1ro en un array de names y lo insertyo directo como un array de objetos con prop name..los meto en la tabla 
      //console.log("generosParaDB ---- >>>>", generosParaDB);
      //createdGenre = await Genero.bulkCreate(generosParaDB.map(name => ({ name }))); // ojo q deberia venir directo del map
      createdGenre = await Genero.bulkCreate(generosAPI.data.results.map(g => ({ name: g.name })));

      } catch (error) {
        throw Error(error);
      }
      
    }

    let genres = [];
    for (const name of generosNames) {
      existingGenre = await Genero.findOne({ where: { name } });
      if (existingGenre) {
        genres.push(existingGenre);
      }
    }

    if (genres.length > 0) {
      const createdVideogame = await videogame.save();
      await createdVideogame.addGeneros(genres);
      return createdVideogame;
    }

    return null;
  }

  async function findOrCreateDBGenre() { // hay q trer los generos de la BD y usarlos alli... 
    
    // traigo todos los generos de la API la 1ra vez 
    let existingGenre = await Genero.findAll(); //>> => busco si la tabla de generos esta vacia
 
    if(existingGenre.length === 0){
      try {
        const generosAPI = await axios.get(`https://api.rawg.io/api/genres?key=${MY_API_KEY}`);
        createdGenre = await Genero.bulkCreate(generosAPI.data.results.map(g => ({ name: g.name })));
      } catch (error) {
        throw Error(error);
      }
      return createdGenre
    } else {
      return existingGenre;
    }
  }

  


module.exports = {createVideogameWithGenre,
                  findOrCreateDBGenre};