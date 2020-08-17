module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    placeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    boroughId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Location.associate = model => {
    Location.belongsTo(model.User);
  };
  return Location;
};
