const router = require("express").Router();
const userController = require("../controllers/user_controller");
const auth = require("../auth");

// router.post("/signUp", userController.signUp);
// router.get("/getData", auth, userController.getAllUser);
// router.get("/userById/:userId", auth, userController.getUserById);
// router.put("/update/:userId", auth, userController.updateUserData);
// router.delete("/delete/:userId", auth, userController.deleteUserData);
// router.post("/login", userController.login);
// router.put("/forgotPassword", auth, userController.forgotPassword);

// module.exports = router;

router.post("/signUp", userController.signUp);
router.get("/getData", userController.getAllUser);
router.get("/userById/:userId", userController.getUserById);
router.put("/update/:userId", userController.updateUserData);
router.delete("/delete/:userId", userController.deleteUserData);
router.post("/login", userController.login);
router.put("/forgotPassword", userController.forgotPassword);

module.exports = router;
