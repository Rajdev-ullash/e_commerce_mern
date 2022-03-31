const express = require("express");

const router = express.Router();

// import middleware

const { checkLogin } = require("../middleware/checkLogin");

const {
  userMiddleware,
  adminMiddleware,
} = require("../middleware/checkUserRole");

// import controller

const {
  createCategory,
  allCategory,
  slugCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/categoryController");

router.post("/createCategory", checkLogin, createCategory);
router.get("/allCategory", allCategory);
router.get("/specificCategory/:slug", slugCategory);
router.put("/updateCategory/:slug", checkLogin, updateCategory);
router.delete("/deleteCategory/:slug", deleteCategory);

module.exports = router;
