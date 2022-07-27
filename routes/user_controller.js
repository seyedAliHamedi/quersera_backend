const passport = require("passport");
const bcrypt = require("bcryptjs");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
var http = require("follow-redirects").http;
var qs = require("querystring");

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
        const code = sendSms(phone);
        const newUser = new User({ name, username, phone, email, password, authCode: code });
        newUser
          .save()
          .then(() => {
            jwt.sign({ user: newUser }, "secretKey", (err, token) => {
              if (err) {
                res.send(`an error has occured : ${err}`);
              } else {
                res.json({ token: token });
              }
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
});

router.post("/login", passport.authenticate("local", { failureMessage: "u suck" }), (req, res) => {
  res.send("success");
});

router.post("/sms", attachTokenToReq, (req, res) => {
  jwt.verify(req.token, "secretKey", (err, payload) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (payload.user.authCode == req.body.authCode) {
        res.send("1");
      } else {
        res.send("2");
      }
    }
  });
});
function attachTokenToReq(req, res, next) {
  const bearerHeader = req.headers["auth"];
  //? bearerHeader --> bearer <access_token>
  if (typeof bearerHeader != "undefined") {
    const tempArr = bearerHeader.split(" ");
    const bearerToken = tempArr[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}
function sendSms(phone) {
  var options = {
    method: "POST",
    hostname: "api.ghasedaksms.com",
    path: "/v2/sms/send/simple",
    headers: {
      apikey: "CFTHvwstgNEQjpbkVSDyh1xxDqw8IlAPio6011O70rU",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    maxRedirects: 20,
  };

  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });

    res.on("error", function (error) {
      console.error(error);
    });
  });
  let code = Math.floor(Math.random() * (999999 - 100000) + 100000);
  var postData = qs.stringify({
    message: `here is your code ${code}`,
    sender: "30005006007500",
    receptor: phone,
  });

  req.write(postData);

  req.end();
  return code;
}
module.exports = router;
