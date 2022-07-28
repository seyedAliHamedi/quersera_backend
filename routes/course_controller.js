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
  const { name, imgUrl, description, institution, year, public } = req.body;
  const teacher = req.user._id;
  const newCourse = new Course({ name, teacher, imgUrl, description, institution, year, public });
  newCourse
    .save()
    .then(() => {
      res.json({ msg: "Course added successfully" });
    })
    .catch((err) => console.log(err));
});

router.get("/courses/filterd", async (req, res) => {
  try {
    let course;
    if (!req.headers["filters"].attending && !req.headers["filters"].teaching) {
      course = {};
    } else if (req.headers["filters"].attending && req.headers["filters"].teaching) {
      course = await Course.where("name")
        .equals(req.headers["filters"].title)
        .where("institution")
        .equals(req.headers["filters"].institution)
        .where("year")
        .equals(req.headers["filters"].year);
    } else if (req.headers["filters"].teaching) {
      course = await Course.where("name")
        .equals(req.headers["filters"].title)
        .where("institution")
        .equals(req.headers["filters"].institution)
        .where("year")
        .equals(req.headers["filters"].year)
        .where("teacher")
        .equals(req.user._id);
    } else {
      course = await Course.where("name")
        .equals(req.headers["filters"].title)
        .where("institution")
        .equals(req.headers["filters"].institution)
        .where("year")
        .equals(req.headers["filters"].year)
        .where("teacher")
        .ne(req.user._id);
    }
    res.send(course);
  } catch (error) {
    console.log(e.message);
  }
});

module.exports = router;
