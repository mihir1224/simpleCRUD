const users = require("../model/user_model");
// const jwt = require("../jwt");

//create
exports.createUserData = async (req, res) => {
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
      records: saveUser.length,
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
