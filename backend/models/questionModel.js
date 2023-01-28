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
    options: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option',
      },
    ],
    questionResponses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuestionResponse',
      },
    ],
    other: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Question', questionSchema);
