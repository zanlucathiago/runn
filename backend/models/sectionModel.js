const mongoose = require('mongoose');

const sectionSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    form: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Form',
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Section', sectionSchema);
