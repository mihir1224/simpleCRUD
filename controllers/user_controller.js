const users = require("../model/user_model");
const jwt = require("../jwt");
const { use } = require("../routes/user_routes");
const { updateOne } = require("../model/user_model");
// const nodemailer = require("nodemailer");
// const { user } = require("firebase-functions/v1/auth");

//create
exports.signUp = async (req, res) => {
  try {
    const user = new users({
      name: req.body.name,
      mobile: req.body.mobile,
      password: req.body.password,
      email: req.body.email,
      age: req.body.age,
      birthDate: req.body.birthDate,
    });

    const saveUser = await user.save();
    res.send({
      error: false,
      statusCode: 200,
      message: "User created successfully",
      data: saveUser,
    });
  } catch (error) {
    res.send({
      error: true,
      statusCode: 404,
      message: error.message,
    });
  }
};

//User All data
exports.getAllUser = async (req, res) => {
  try {
    const user = await users.find();
    res.json({
      error: false,
      statusCode: 200,
      message: "User fetched successfully",
      records: user.length,
      data: user,
    });
  } catch (error) {
    res.json({
      error: true,
      statusCode: 404,
      message: error.message,
    });
  }
};

//show single user
exports.getUserById = async (req, res) => {
  try {
    const user = await users.findById(req.params.userId);
    res.json({
      error: false,
      statusCode: 200,
      message: "User data fetched successfully",
      records: user.length,
      data: user,
    });
  } catch (error) {
    res.status(404).send({
      error: true,
      statusCode: 404,
      message: error.message,
    });
  }
};

//update user data
exports.updateUserData = async (req, res) => {
  try {
    const User = req.body;

    const updateUser = await users.findByIdAndUpdate(req.params.userId, User, {
      new: true,
    });
    res.json({
      error: true,
      statusCode: 200,
      message: "User updated successfully",
      records: updateUser.length,
      data: updateUser,
    });
  } catch (error) {
    res.json({
      error: true,
      statusCode: 404,
      message: error.message,
    });
  }
};

//delete user data
exports.deleteUserData = async (req, res) => {
  try {
    const deleteUser = await users.findByIdAndDelete(req.params.userId);
    res.json({
      error: false,
      statusCode: 200,
      message: "User deleted successfully",
      records: deleteUser.length,
      data: deleteUser,
    });
  } catch (error) {
    res.json({
      error: true,
      statusCode: 404,
      message: error.message,
    });
  }
};

//login page
exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    let userData = await users.findOne({ email: email });
    if (userData) {
      if (userData.password == password) {
        const token = await jwt.generateAuthToken(userData._id);

        userData = userData.toObject();
        delete userData.password;

        res.json({
          error: false,
          statusCode: 200,
          message: "Login successfully",
          Token: token,
          data: userData,
        });
      } else {
        res.json({
          error: true,
          statusCode: 401,
          message: "Invalid password",
        });
      }
    } else {
      res.json({
        error: true,
        statusCode: 204,
        message: "Account not found",
      });
    }
  } catch (error) {
    res.json({
      error: true,
      statusCode: 404,
      message: error.message,
    });
  }
};

//forgot password
exports.forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userDetails = await users.findOne({ email: email });

    if (userDetails) {
      await userDetails.updateOne({ password: password });

      res.json({
        error: false,
        statusCode: 200,
        message: "Password updated successfully",
        data: userDetails,
      });
    } else {
      res.json({
        error: true,
        statusCode: 404,
        message: "User not found",
      });
    }
  } catch (error) {
    res.json({
      error: true,
      statusCode: 404,
      message: error.message,
    });
  }
};
