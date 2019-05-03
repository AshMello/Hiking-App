'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT
  }, {});
  Location.associate = function(models) {
    // associations can be defined here
  };
  return Location;
};