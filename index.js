const express = require('express');
const router = require('./router/routes');
const app = express();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Serving you up on http://localhost:${port}`);
});
