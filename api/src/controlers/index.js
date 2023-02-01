const Sequelize = require('sequelize');
const { Videogame, Genero, sequelize } = require('../db');


async function createVideogameWithGenre(videogame, name) {
    let createdGenre;
    console.log("genre ---- >> ", name);
    console.log("videogame ---- > ",videogame);
    const existingGenre = await Genero.findOne({ where: { name } });
    if (existingGenre) {
      createdGenre = existingGenre;
    } else {
      createdGenre = await Genero.create({name});
    }
    console.log("antes del save");
    const createdVideogame = await videogame.save();
    console.log("despues del save");
    await createdVideogame.addGenero(createdGenre);
  
    return createdVideogame;
  }

module.exports = createVideogameWithGenre;