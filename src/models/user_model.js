const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'email_required'],
      unique: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'email_not_valid'],
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
  { timestamps: true },
);

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.getSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

module.exports = mongoose.model('User', UserSchema);
