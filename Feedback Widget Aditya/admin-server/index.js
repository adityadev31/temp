require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
const passport = require('passport');
const sessions = require('express-session');
const passportSetup = require('./middlewares/passportAuth');
const { initializeSocket } = require('./middlewares/socket');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
//session middleware
app.use(sessions({
  secret: process.env.EXPRESS_SESSION_SECRET,
  saveUninitialized: true,
  resave: false
}));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session());

// ===== ROUTES ======
const question_routes = require("./routes/question.routes");
const auth_routes = require("./routes/auth.routes");
const feedback_routes = require("./routes/feedback.routes");

app.use("/api/v1/", question_routes);
app.use("/api/v1/", auth_routes);
app.use("/api/v1/", feedback_routes);

app.get("/", (req, res) => {
  res.send("Server running.");
});

// ===== START SERVER =====
const server = app.listen(PORT, async () => {
  console.log(`Server started at PORT ${PORT}`)
  mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Connected to mongoDB");
  }).catch ((err) => {
    console.log("Connection to mongoDB failed : ", err);
  });
});
initializeSocket(server);