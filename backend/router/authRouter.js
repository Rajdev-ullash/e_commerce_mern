const express = require("express");

const router = express.Router();

// import middleware

const { checkLogin } = require("../middleware/checkLogin");

const {
  userMiddleware,
  adminMiddleware,
} = require("../middleware/checkUserRole");

// import validation middleware

const {
  addUserValidator,
  addUserValidationHandler,
} = require("../validation/userValidator");

// import controller

const { register, login } = require("../controller/authController");

router.post("/register", addUserValidator, addUserValidationHandler, register);

router.post("/login", login);

module.exports = router;
