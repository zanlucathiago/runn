const mongoose = require('mongoose');

const validationSchema = mongoose.Schema(
  {
    question: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Question',
    },
    expression: {
      type: String,
    },
    operator: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Validation', validationSchema);
