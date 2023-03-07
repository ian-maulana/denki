const express = require('express');
const env = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const i18next = require('i18next');
const i18nextNodeFs = require('i18next-node-fs-backend');
const i18nextMiddleware = require('i18next-http-middleware');

i18next
  .use(i18nextMiddleware.LanguageDetector)
  .use(i18nextNodeFs)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    backend: { loadPath: 'public/i18n/{{lng}}/{{ns}}.json' },
    preload: ['en', 'id'],
    defaultNS: 'locale',
    ns: ['locale'],
  });

// middleware
const errorParser = require('#middleware/error_parser');
const serializeResponse = require('#middleware/serialize_response');

// db driver
const connectDB = require('#config/db');

// route files
const onboardRoute = require('#routes/onboard_route');
const noteRoute = require('#routes/note_route');
const userRoute = require('#routes/user_route');

const app = express();

// load environment variable
env.config({ path: '.env' });

// connect to database
connectDB();

app.use(i18nextMiddleware.handle(i18next));

app.use(express.json());
app.use(serializeResponse);

// logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// mount routers
app.use('/api/v1/note', noteRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/onboard', onboardRoute);

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
