const mongoose = require('mongoose');

const questionResponseSchema = mongoose.Schema(
  {
    formResponse: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Form',
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('QuestionResponse', questionResponseSchema);
