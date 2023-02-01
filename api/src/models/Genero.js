
 const { DataTypes } = require('sequelize');
//const Sequelize = require('sequelize');


// Definir la entidad de géneros

//const Genero = sequelize.define('genero', {

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('genero', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
}