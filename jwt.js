//json web token
const jwt = require("jsonwebtoken");

exports.generateAuthToken = async function (userId) {
  try {
    const token = jwt.sign(
      { _id: userId.toString() },
      "abcdefghijklmnopqrstuvwxyz1234567890"
    );
    return token;
  } catch (error) {
    console.log("the error part" + error);
  }
};
