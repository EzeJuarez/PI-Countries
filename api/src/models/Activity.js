const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('activity', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    season: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    country: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  });
};