import sequelize, { Datatypes } from './index.js';

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

console.log(User === sequelize.models.User); // true
