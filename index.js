require('dotenv').config();
const db = require('./models/index');
const express = require('express');
const router = require('./router/routes');

const app = express();

const port = process.env.PORT;

db.sequelize
  .authenticate()
  .sync({ force: true })
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(port, () => {
  console.log(`Serving you up on http://localhost:${port}`);
});
