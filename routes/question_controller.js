const router = require("express").Router();

const Quesiton = require("../models/question");
router.get("/questions", (req, res) => {
  Quesiton.find({ practiceId: req.headers["practiceId"] })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});
router.get("/questions/:id", (req, res) => {
  Quesiton.find({ practiceId: req.headers["practiceId"], _id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});
router.delete("/questions/:id", (req, res) => {
  Quesiton.deleteOne({ practiceId: req.headers["practiceId"], _id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});
router.put("/questions/:id", (req, res) => {
  Quesiton.findOne({ practiceId: req.headers["practiceId"], _id: req.params.id })
    .then((user) => {
      for (const key in req.body.keys) {
        user[key] = req.body.values[key];
      }
      res.json(data);
    })
    .catch((err) => console.log(err));
});
router.post("/questions/", (req, res) => {
  const { name, description, body, points, difficulty, type, answer } = req.body;
  practiceId = req.headers["practiceId"];
  const newQuesiton = new Quesiton({
    name,
    description,
    body,
    points,
    difficulty,
    type,
    answer,
    practiceId,
  });
  newQuesiton
    .save()
    .then(() => {
      res.json({ msg: "question added successfully" });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
