const router = require("express").Router();

const Course = require("../models/course");
router.get("/courses", (req, res) => {
  Course.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});
router.get("/courses/:id", (req, res) => {
  Course.find({ _id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});
router.delete("/courses/:id", (req, res) => {
  Course.deleteOne({ _id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});
router.put("/courses/:id", (req, res) => {
  Course.findOne({ _id: req.params.id })
    .then((user) => {
      for (const key in req.body.keys) {
        user[key] = req.body.values[key];
      }
      res.json(data);
    })
    .catch((err) => console.log(err));
});
router.post("/courses/", (req, res) => {
  const { name, imgUrl, description, institutions, year, public } = req.body;
  const teacher = req.user._id;
  const newCourse = new Course({ name, teacher, imgUrl, description, institutions, year, public });
  newCourse
    .save()
    .then(() => {
      res.json({ msg: "Course added successfully" });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
