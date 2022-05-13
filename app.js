const express = require("express");

const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");

const app = express();

//configure
require("dotenv").config();

app.use(express.json());

//middleware
app.use((req, res, next) => {
  const authorization = req.header("Authorization");
  let token;
  if (authorization) {
    token = authorization.replace("Bearer ", "");
  }

  if (req.path != "/api/login" && req.path != "/api/signUp") {
    jwt.verify(
      token,
      "abcdefghijklmnopqrstuvwxyz123456",
      function (error, users) {
        if (error)
          return res.status(500).send({
            auth: false,
            message: "Failed to authenticate token.",
          });
        next();
      }
    );
  } else {
    next();
  }
});

//user_routes
const userRoutes = require("./routes/user_routes");

//api link for user
app.use("/api", userRoutes);

//connect to database
mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("successfully connect")
);

//server
app.get("", (req, res) => {
  res.send("Hello! Database");
});
app.listen(1004, () => {
  console.log("connect...");
});
