const mongoose = require('mongoose');
const schema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  description: [
    {
      allocation: {
        type: Number,
        required: true,
      },
      word: {
        type: String,
        required: true,
      },
    },
  ],
  creationTime: {
    type: Date,
    default: new Date(),
  },
  lastUpdationTime: {
    type: Date,
    default: new Date(),
  },
});
module.exports = mongoose.model('Photo', schema);
