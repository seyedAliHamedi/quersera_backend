const router = require("express").Router();

const Practice = require("../models/practice");
router.get("/practices", (req, res) => {
  Practice.find({ courseId: req.headers["courseId"] })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});
router.get("/practices/:id", (req, res) => {
  Practice.find({ courseId: req.headers["courseId"], _id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});
router.delete("/practices/:id", (req, res) => {
  Practice.deleteOne({ courseId: req.headers["courseId"], _id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});
router.put("/practices/:id", (req, res) => {
  Practice.findOne({ courseId: req.headers["courseId"], _id: req.params.id })
    .then((user) => {
      for (const key in req.body.keys) {
        user[key] = req.body.values[key];
      }
      res.json(data);
    })
    .catch((err) => console.log(err));
});
router.post("/practices/", (req, res) => {
  const { name, description, endTime } = req.body;
  courseId = req.headers["courseId"];
  const newPractice = new Practice({ name, description, endTime, courseId });
  newPractice
    .save()
    .then(() => {
      res.json({ msg: "Practice added successfully" });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
