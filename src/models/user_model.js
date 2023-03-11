const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { regexEmail } = require('#utils/validator');

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'email_required'],
      unique: true,
      match: [regexEmail, 'email_not_valid'],
    },
    password: {
      type: String,
      required: [true, 'password_required'],
      minlength: 6,
      select: false,
    },
    name: {
      type: String,
      required: [true, 'name_required'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      hide: 'password',
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
);

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// Cascade delete note when a user is deleted
UserSchema.pre('remove', async function (next) {
  await this.model('Note').deleteMay({ user: this.id });
  next();
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  const data = { id: this.id, name: this.name, email: this.email };
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
