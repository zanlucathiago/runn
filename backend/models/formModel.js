const mongoose = require('mongoose');

const formSchema = mongoose.Schema(
  {
    sections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section',
      },
    ],
    formResponses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FormResponse',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Form', formSchema);
