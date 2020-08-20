module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    beerName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Unknown Beer',
    },
    beerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    placeName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Unknown Pub',
    },
    placeId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Unknown Pub',
    },
    boroughName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    boroughId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  });

  Location.associate = model => {
    Location.belongsTo(model.User);
  };
  return Location;
};
