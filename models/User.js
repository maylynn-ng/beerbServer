module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sub: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    favouriteBeers: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      default: [],
    },
    badges: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      default: [],
    },
  });

  user.associate = model => {
    user.hasMany(model.Location);
    user.belongsToMany(model.Beer, { through: 'UserBeers' });
    user.belongsToMany(model.Badge, { through: 'UserBadges' });
  };
  return user;
};
