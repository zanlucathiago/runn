const mongoose = require('mongoose')

const formSchema = mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'User',
    // },
    // text: {
    //   type: String,
    //   required: [true, 'Please add a text value'],
    // },
    title: {
      type: String,
      required: [true, 'Por favor insira um título'],
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Form', formSchema)