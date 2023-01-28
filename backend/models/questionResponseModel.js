const mongoose = require('mongoose');

const questionResponseSchema = mongoose.Schema(
  {
    formResponse: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'FormResponse',
    },
    options: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option',
      },
    ],
    text: {
      type: String,
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Question',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('QuestionResponse', questionResponseSchema);
