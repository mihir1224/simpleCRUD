// const jwt = require("./jwt");

const jwt = require("jsonwebtoken");
const user = require("./model/user_model");

module.exports = function setCurrentUser(req, res, next) {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    jwt.verify(
      token,
      "abcdefghijklmnopqrstuvwxyz123456",
      function (error, user) {
        if (error) {
          res.send({
            error: true,
            statusCode: 401,
            message: error.message,
          });
        } else {
          req.users = user;
          next();
        }
      }
    );
  } catch (error) {
    res.send({
      error: true,
      statusCode: 501,
      message: error.message,
    });
  }
};
