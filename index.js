require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const router = require('./router/routes');
const db = require('./models');

const app = express();
const port = process.env.PORT;

const corsConfig = {
  origin: process.env.CLIENT_HOST,
  credentials: true,
};

app.use(morgan('dev'));
app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());

app.use(router);

db.sequelize
  .sync() // { force: true }
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(port, () => {
  console.log(`Serving you up on http://localhost:${port}`);
});
