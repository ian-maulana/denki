const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: String,
    body: {
      type: String,
      required: true,
    },
    pubdate: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Note', NoteSchema);
