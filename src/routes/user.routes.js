const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const { userValidation } = require("../validations");
const { userController } = require("../controllers");
const { authCheck } = require("../middlewares/auth");

router.post("/add-user",validate(userValidation.addUser), userController.addUser)
router.post("/login-user",validate(userValidation.loginUser), userController.loginUser)
router.post("/user-details",validate(userValidation.userDetails), userController.userDetails)






module.exports = router;