const users = require("../model/user_model");
const jwt = require("../jwt");
const response = require("../response");

//User sign-up
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
    res.send(
      response.generate(false, 200, "User created successfully", saveUser)
    );
  } catch (error) {
    res.send(response.generate(true, 404, error.message));
  }
};

//All user data
exports.getAllUser = async (req, res) => {
  try {
    const user = await users.find();
    res.send(
      response.generate(
        false,
        200,
        "User fetched successfully",
        user,
        user.length
      )
    );
  } catch (error) {
    res.send(response.generate(true, 404, error.message));
  }
};

//Show single user
exports.getUserById = async (req, res) => {
  try {
    const user = await users.findById(req.params.userId);
    res.send(
      response.generate(false, 200, "User data fetched successfully", user)
    );
  } catch (error) {
    res.send(response.generate(true, 404, error.message));
  }
};

//Update user data
exports.updateUserData = async (req, res) => {
  try {
    const User = req.body;

    const updateUser = await users.findByIdAndUpdate(req.params.userId, User, {
      new: true,
    });
    res.send(
      response.generate(
        true,
        200,
        "User updated successfully",
        updateUser.length,
        updateUser
      )
    );
  } catch (error) {
    res.send(response.generate(true, 404, error.message));
  }
};

//Delete user data
exports.deleteUserData = async (req, res) => {
  try {
    const deleteUser = await users.findByIdAndDelete(req.params.userId);
    res.send(
      response.generate(false, 200, "User deleted successfully", deleteUser)
    );
  } catch (error) {
    res.send(response.generate(true, 404, error.message));
  }
};

//User login
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

        res.send(
          response.generate(false, 200, "Login successfully", {
            ...userData,
            ...{ token: token },
          })
        );
      } else {
        res.send(response.generate(true, 401, "Invalid password"));
      }
    } else {
      res.send(response.generate(true, 204, "Account not found"));
    }
  } catch (error) {
    res.send(response.generate(true, 404, error.message));
  }
};

//Forgot password
exports.forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    let userDetails = await users.findOne({ email: email });

    if (userDetails) {
      userDetails = await users.findOneAndUpdate(
        { email: email },
        { password: password },
        { new: true }
      );

      res.send(
        response.generate(
          false,
          200,
          "Password updated successfully",
          userDetails
        )
      );
    } else {
      res.send(response.generate(true, 404, "User not found"));
    }
  } catch (error) {
    res.send(response.generate(true, 404, error.message));
  }
};
