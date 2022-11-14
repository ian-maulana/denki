const express = require('express');
const env = require('dotenv');

// Route files
const notes = require('./routes/notes');

// load environment variable
env.config({ path: './src/config/.env' });

const app = express();
app.use('/api/v1/notes', notes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  // eslint-disable-next-line no-console
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);
