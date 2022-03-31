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
  createSubCategory,
  allSubCategory,
  slugSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../controller/subCategoryController");

router.post("/createSubCategory", checkLogin, createSubCategory);
router.get("/allSubCategory", allSubCategory);
router.get("/specificSubCategory/:slug", slugSubCategory);
router.put("/updateSubCategory/:slug", checkLogin, updateSubCategory);
router.delete("/deleteSubCategory/:slug", deleteSubCategory);

module.exports = router;
