const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Team', {
      //   id: {
      //   type: DataTypes.UUID,
      //   primaryKey: true,
      //   defaultValue: DataTypes.UUIDV4
      // },
      teams: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  };