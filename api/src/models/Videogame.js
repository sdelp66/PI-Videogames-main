 const { DataTypes } = require('sequelize');
// // Exportamos una funcion que define el modelo
// // Luego le injectamos la conexion a sequelize.
// module.exports = (sequelize) => {
//   // defino el modelo
//   sequelize.define('videogame', {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   });
// };

//const Sequelize = require('sequelize');

// Crear una instancia de Sequelize // no la necesito aqui viene de db.js?
// const sequelize = new Sequelize('videogames', DB_USER, DB_PASSWORD, {
//   host: DB_HOST,
//   dialect: 'postgres',
// });

// Definir la entidad de videojuegos
//const Videojuego = sequelize.define('videojuego', {
  module.exports = (sequelize) => {
    // defino el modelo
  sequelize.define('videogame', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fechaLanzamiento: {
    type: DataTypes.DATE,
  },
  rating: {
    type: DataTypes.FLOAT,
  },
  plataformas: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  apiId: {
    type: DataTypes.INTEGER,
  },
});
}



// // Crear la relación muchos a muchos entre videojuegos y géneros
// Videojuego.belongsToMany(Genero, { through: 'VideojuegoGenero' });
// Genero.belongsToMany(Videojuego, { through: 'VideojuegoGenero' });

// // Sincronizar los modelos con la base de datos
// sequelize.sync();

// // Exportar las entidades
// module.exports = {
//   Videojuego,
//   Genero,
// };

