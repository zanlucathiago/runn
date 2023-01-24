const mongoose = require('mongoose');

const formSchema = mongoose.Schema(
  {
    user: {
      type: String,
    },
    sections: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Section',
    }]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Form', formSchema);
