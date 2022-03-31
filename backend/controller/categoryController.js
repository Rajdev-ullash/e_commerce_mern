const Category = require("../model/categoryModel");

const slugify = require("slugify");

exports.createCategory = async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
      slug: slugify(req.body.name),
    });
    await category.save();
    res.status(200).json({
      data: category,
      message: "Category saved successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Category not created",
    });
  }
};

exports.allCategory = async (req, res) => {
  try {
    const data = await Category.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      result: data,
      message: "All category find successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Category not found",
    });
  }
};

exports.slugCategory = async (req, res) => {
  try {
    let category = await Category.findOne({ slug: req.params.slug });
    res.status(200).json({
      data: category,
      message: "Category found successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Category not found",
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name: req.body.name, slug: slugify(req.body.name) },
      { new: true }
    );
    res.status(200).json({
      data: updated,
      message: "Category updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Category not found",
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    let category = await Category.findOneAndDelete({ slug: req.params.slug });
    res.status(200).json({
      data: category,
      message: "Category deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Category not found",
    });
  }
};
