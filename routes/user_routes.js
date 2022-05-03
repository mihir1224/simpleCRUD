const router = require("express").Router();
const userController = require("../controllers/user_controller");

router.post("/signUp", userController.signUp);
router.post("/login", userController.login);

module.exports = router;
