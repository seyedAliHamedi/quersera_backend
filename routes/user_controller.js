const passport = require("passport");
const bcrypt = require("bcryptjs");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

const User = require("../models/user");

router.get("/login", (req, res) => {
  res.send("login");
});
router.get("/register", (req, res) => {
  res.send("register");
});

router.post("/register", async (req, res) => {
  const { name, username, phone, email, password1, password2 } = req.body;

  //* Validation
  if (!name || !username || !phone || !email || !password1 || !password2) {
    return res.send("Please enter all the field");
  }
  if (password1 !== password2) {
    return res.send("The passwords dosn't match");
  }
  if (password1.length < 3) {
    return res.send("The passwords is too short");
  }
  let user = await User.findOne({ email: email });
  if (user) {
    return res.send("email is used");
  }
  user = await User.findOne({ username: username });
  if (user) {
    return res.send("username is used");
  }
  user = await User.findOne({ phone: phone });
  if (user) {
    return res.send("phone is used");
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.log(err);
    }
    bcrypt
      .hash(password1, salt)
      .then((password) => {
        const newUser = new User({ name, username, phone, email, password });
        newUser
          .save()
          .then(() => {
            res.send("Success");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
});

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/api/passport/login" }),
  (req, res) => {
    const obj = { id: 123 };
    jwt.sign({ obj: obj }, "secretKey", (err, token) => {
      if (err) {
        res.send(`an error has occured : ${err}`);
      } else {
        res.json({ obj: obj, token: token });
      }
    });
  }
);

module.exports = router;
