const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Team', {
      teams: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  };