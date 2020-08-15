module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.associate = model => {
    User.hasMany(model.Location, { foreignKey: 'Name' });
  };
  return User;
}; // true

//console.log(User === sequelize.models.User);
