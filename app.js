const express = require("express");
const mongoose = require("mongoose");
const cors = require("express");
const passport = require("passport");
const session = require("express-session");

const { dbUser, dbPassword, dbName } = require("./config/constants");
const app = express();

//* Database connection

mongoose.connect(
  `mongodb+srv://${dbUser}:${dbPassword}@cluster0.ukqge.mongodb.net/${dbName}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("db connected")
);

//? Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//* Routes

// app.use("/quersera/users", require("./routes/user_controller"));
// app.use("/quersera/courses", require("./routes/course_controller"));
// app.use("/quersera/practices", require("./routes/practice_controller"));
// app.use("/quersera/questions", require("./routes/question_controller"));

//! SERVER
const PORT = process.env.PORT || 90;
app.listen(PORT, () => console.log(`app is running on ${PORT}`));
