const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
  urlString: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: Date.now,
  },
});

module.exports = mongoose.model("Image", ImageSchema);
