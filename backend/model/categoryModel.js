const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
      minLength: [3, "Length is to short"],
      maxLength: [32, "Length is to long"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      indent: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
