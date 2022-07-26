const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  body: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
    enum: ["Easy", "Medium", "Hard", "VeryHard"],
  },
  type: {
    type: String,
    required: true,
    enum: ["Descriptive", "MultiCoice", "BlankSpace"],
  },
  answer: {
    type: String,
    required: true,
  },
  submitsList: [
    {
      user: { type: mongoose.SchemaTypes.ObjectId, require: true },
      answers: [String],
    },
  ],
  finalSubmitList: [
    {
      user: { type: mongoose.SchemaTypes.ObjectId, require: true },
      finalAnswer: String,
    },
  ],
  usersPoints: [
    {
      user: { type: mongoose.SchemaTypes.ObjectId, require: true },
      points: Number,
    },
  ],
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

module.exports = mongoose.model("Quesiton", questionSchema);
