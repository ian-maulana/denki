const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const env = require('dotenv');

// Load env vars
env.config({ path: '.env' });

// Load models
const User = require('#models/user_model');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Read JSON files
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'),
);

// Import into DB
const importData = async () => {
  try {
    await User.create(users);

    // eslint-disable-next-line no-console
    console.log(colors.green.inverse.bold('Data Imported...'));
    process.exit();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany();

    // eslint-disable-next-line no-console
    console.log(colors.red.inverse.bold('Data Destroyed...'));
    process.exit();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
