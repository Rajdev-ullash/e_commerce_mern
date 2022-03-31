exports.userMiddleware = async (req, res, next) => {
  if (req.userId.role !== "user") {
    res.status(404).json({ message: "only user can access" });
  }
};

exports.adminMiddleware = async (req, res, next) => {
  if (req.userId.role !== "admin") {
    res.status(404).json({ message: "only admin can access" });
  }
};
