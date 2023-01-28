const mongoose = require('mongoose');

const formResponseSchema = mongoose.Schema(
  {
    form: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Form',
    },
    questionResponses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuestionResponse',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('FormResponse', formResponseSchema);
