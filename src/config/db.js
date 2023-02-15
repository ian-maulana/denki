const mongoose = require('mongoose');

const connectDB = async () => {
  const db = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // eslint-disable-next-line no-console
  console.log(`MongoDB connected: ${db.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
