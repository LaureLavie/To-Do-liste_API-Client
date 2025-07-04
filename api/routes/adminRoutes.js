const verifyToken = require("../util/verifyToken");
const Task = require("../models/task");
const User = require("../models/user");

const router = require("express").Router();

router.get("/admin/user", verifyToken, async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

router.delete("/admin/user/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  await Task.deleteMany({ userId: id });
  await User.findByIdAndDelete(id);
  res
    .status(200)
    .json({ message: "L'utilisateur et ses tâche ont été supprimés" });
});

module.exports = router;
