const express = require("express");

const mongoose = require("mongoose");

const app = express();

//configure
require("dotenv").config();

//middleWare
app.use(express.json());

//user_routes
const userRoutes = require("./routes/user_routes");

//api link for user
app.use("/api/user", userRoutes);

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
