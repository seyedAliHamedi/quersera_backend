const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  institution: {
    type: String,
    required: true,
  },
  teacher: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  year: {
    type: Number,
    min: 2000,
    max: 2030,
    required: true,
  },
  open: {
    type: Boolean,
    default: true,
  },
  public: {
    type: Boolean,
    default: true,
  },
  practices: {
    type: [mongoose.SchemaTypes.ObjectId],
  },
  attendnce: {
    type: [mongoose.SchemaTypes.ObjectId],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Course", courseSchema);
