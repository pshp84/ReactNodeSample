const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true
    },
    image: {
      type: String,
      // required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model('Record', RecordSchema);