const express = require('express');
const env = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');

// middleware
const errorParser = require('#middleware/error_parser');

// db driver
const connectDB = require('#config/db');

// route files
// const notes = require('./routes/notes');
const userRoute = require('#routes/user_route');

// load environment variable
env.config({ path: '.env' });

// connect to database
connectDB();

const app = express();

app.use(express.json());

// logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// mount routers
// app.use('/api/v1/notes', notes);
app.use('/api/v1/user', userRoute);

app.use(errorParser);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  // eslint-disable-next-line no-console
  console.log(
    colors.yellow.bold(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
    ),
  ),
);

process.on('unhandledRejection', (error) => {
  // eslint-disable-next-line no-console
  console.log(`Error: ${error.message}`.red);
  server.close(() => process.exit(1));
});
