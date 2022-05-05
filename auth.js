const jwt = require("./jwt");
const user = require("./model/user_model");

module.exports = function setCurrentUser(req, res, next) {
  try {
    const token = req.header("Authorization").replace("Bearer", "");

    const user = jwt.generateAuthToken(token).then((user) => {
      req.users = user;

      next();
    });
  } catch (error) {
    res.send({
      error: true,
      statusCode: 404,
      message: error.message,
    });
  }
};
