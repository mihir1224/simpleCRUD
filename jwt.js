//json web token
const jwt = require("jsonwebtoken");

exports.generateAuthToken = async function (userId) {
  try {
    const token = jwt.sign(
      { _id: userId.toString() },
      "abcdefghijklmnopqrstuvwxyz123456"
    );
    return token;
  } catch (error) {
    console.log("the error part" + error);
  }
};
