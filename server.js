const express = require('express');
const env = require('dotenv');

// load environment variable
env.config({ path: './config/config.env' });

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  // eslint-disable-next-line no-console
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);
