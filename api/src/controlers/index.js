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
    console.log("existingGenre ----->> ",existingGenre);
    console.log("existingGenre.length ----->> ",existingGenre.length);
    if(existingGenre.length === 0){
      console.log("antes de generosAPI ---- >>>>");
      try {
      const generosAPI = await axios.get(`https://api.rawg.io/api/genres?key=${MY_API_KEY}`);
      //console.log("generosAPI ---- >>>>", generosAPI);
      const generosParaDB = generosAPI.data.results.map((g) => g.name); // esto esta mal pq tienen q ser objetos {name} verlo depues
      //los meto en la tabla
      console.log("generosParaDB ---- >>>>", generosParaDB);
      createdGenre = await Genero.bulkCreate(generosParaDB.map(name => ({ name }))); // ojo q deberia venir directo del map
      console.log("createdGenre---->>" ,createdGenre);
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



  // esta me gusta el or pero agrega solo un genero pq hace un or... en el de arriba hace 1 por 1 la busqueda...
    //   const genres = await Genero.findAll({
  //     where: {
  //       name: {
  //         [Op.or]: genreNames
  //       }
  //     }
  //   });
  //   if (genres.length > 0) {
  //     existingGenre = genres[0];
  //     const createdVideogame = await videogame.save();
  //     await createdVideogame.addGenero(existingGenre);
  
  //     return createdVideogame;
  //   }
  
  //   return null;
  // }
 

// async function createVideogameWithGenre(videogame, name) { // hay q trer los generos de la BD y usarlos alli... NO CREAR NVOS GENEROS!!
//     let createdGenre;

//     const existingGenre = await Genero.findOne({ where: { name } });
//     if (existingGenre) {
//       createdGenre = existingGenre;
//     } else {
//       createdGenre = await Genero.create({name});
//     }
//     //console.log("antes del save");
//     const createdVideogame = await videogame.save();
//     //console.log("despues del save");
//     await createdVideogame.addGenero(createdGenre);
  
//     return createdVideogame;
//   }

module.exports = createVideogameWithGenre;