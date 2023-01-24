const mongoose = require('mongoose');

const formSchema = mongoose.Schema(
  {
    user: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Form', formSchema);
