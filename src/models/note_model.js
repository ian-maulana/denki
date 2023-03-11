const mongoose = require('mongoose');
const slugify = require('slugify');

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
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
);

// Create note slug from the title
NoteSchema.pre('save', async function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model('Note', NoteSchema);
