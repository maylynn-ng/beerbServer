const express = require('express');
const router = require('./router/routes');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(router);

app.listen(port, () => {
  console.log(`Serving you up on http://localhost:${port}`);
});
