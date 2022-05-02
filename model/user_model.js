const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  mobile: {
    type: String,
    required: [true, "Mobile number is required"],
    unique: [true, "Mobile number is required"],
  },
  password: String,
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email",
    },
    required: [true, "Email is required"],
  },
  age: Number,
  birthDate: Date,
});

module.exports = mongoose.model("users", userSchema);
