const mongoose = require('mongoose');

const questionSchema = mongoose.Schema(
  {
    section: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Section',
    },
    title: {
      type: String,
    },
    model: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Question', questionSchema);
