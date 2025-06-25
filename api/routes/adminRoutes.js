const verifyToken = require("../util/verifyToken");
const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const User = require("../models/User");

router.get("/admin/user", verifyToken, async (req, res) => {
  const users = await User.find();
  res.status(200).json();
});

router.delete("/admin/user/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  await Task.deleteMany({ userId: id });
  await User.findByIdAndDelete(id);
  res.status(200).json({
    message: "L'utilisateur a été supprimé avec succès",
  });
});
