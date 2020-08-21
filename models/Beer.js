module.exports = (sequelize, DataTypes) => {
  const beer = sequelize.define('Beer', {
    beerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    haveHad: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    beerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    beerLabel: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    beerIbu: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    beerDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    beerStyle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    breweryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    breweryCountry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    breweryLabel: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    breweryUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  beer.associate = model => {
    beer.belongsToMany(model.User, { through: 'UserBeers' });
  };
  return beer;
};
