//require dotenv?
const Sequelize = require('sequelize');
const sequelize = new Sequelize('PG_URI');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
