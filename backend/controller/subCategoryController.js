const SubCategory = require("../model/SubCategoryModel");

const slugify = require("slugify");

exports.createSubCategory = async (req, res) => {
  console.log(req.body);
  try {
    const subCategory = new SubCategory({
      name: req.body.name,
      slug: slugify(req.body.name),
      categoryId: req.body.categoryId,
    });
    await subCategory.save();
    res.status(200).json({
      data: subCategory,
      message: "subCategory created successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "subCategory not created",
    });
  }
};

exports.allSubCategory = async (req, res) => {
  try {
    const data = await SubCategory.find({})
      .sort({ createdAt: -1 })
      .populate("categoryId");
    res.status(200).json({
      result: data,
      message: "All subCategory find successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "subCategory not found",
    });
  }
};

exports.slugSubCategory = async (req, res) => {
  try {
    let subCategory = await SubCategory.findOne({
      slug: req.params.slug,
    }).populate("categoryId");
    res.status(200).json({
      data: subCategory,
      message: "subCategory found successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "subCategory not found",
    });
  }
};

exports.updateSubCategory = async (req, res) => {
  console.log(req.body);
  try {
    const updated = await SubCategory.findOneAndUpdate(
      { slug: req.params.slug },
      {
        name: req.body.name,
        slug: slugify(req.body.name),
        categoryId: req.body.categoryId,
      },
      { new: true }
    );
    res.status(200).json({
      data: updated,
      message: "subCategory updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "subCategory not found",
    });
  }
};

exports.deleteSubCategory = async (req, res) => {
  try {
    let subCategory = await SubCategory.findOneAndDelete({
      slug: req.params.slug,
    });
    res.status(200).json({
      data: subCategory,
      message: "subCategory deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "subCategory not found",
    });
  }
};
