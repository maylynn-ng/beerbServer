module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    placeId: {
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
