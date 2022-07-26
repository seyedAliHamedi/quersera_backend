const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const localAuth = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            return done(null, false, { msg: "user not found!" });
          }
          bcrypt
            .compare(password, user.password)
            .then((isMatch) => {
              if (!isMatch) {
                return done(null, false, { msg: "password incorrect!!" });
              }
              console.log("The locacl shit is done");
              return done(null, user, { msg: "Login success" });
            })
            .catch((err) => done(err));
        })
        .catch((err) => done(err));
    })
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
function jwtAuth(passport) {
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "secretKey",
        issuer: "accounts.examplesoft.com",
        audience: "yoursite.net",
      },
      (payload, done) => {
        User.find({ _id: payload.id })
          .then((user) => {
            if (!user) {
              return done(null, false, { msg: "User not found" });
            }
            return done(null, user, { msg: "log in successfully" });
          })
          .catch((err) => done(err, false, { msg: `There has been a problem` }));
      }
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
}
module.exports = { localAuth, jwtAuth };
