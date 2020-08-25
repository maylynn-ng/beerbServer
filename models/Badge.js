module.exports = (sequelize, DataTypes) => {
  const badge = sequelize.define('Badge', {
    badgeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    badgeText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    badgeImage: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  badge.associate = model => {
    badge.belongsToMany(model.User, { through: 'UserBadges' });
  };
  return badge;
};
