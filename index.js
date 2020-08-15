require('dotenv').config();

const express = require('express');
const router = require('./router/routes');
const Sequelize = require('sequelize');
const app = express();

const port = process.env.PORT;

const sequelize = new Sequelize(process.env.PG_URI, {
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(port, () => {
  console.log(`Serving you up on http://localhost:${port}`);
});
