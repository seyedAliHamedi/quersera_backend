const mongoose = require("mongoose");

const practiceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  startTime: {
    type: Date,
    default: Date.now,
  },
  endTime: {
    type: Date,
  },
  beta: {
    type: Boolean,
    default: false,
  },
  latencyRatio: {
    type: Number,
    default: true,
  },
  courseId: { type: mongoose.SchemaTypes.ObjectId },
  questions: {
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

module.exports = mongoose.model("Practice", practiceSchema);
