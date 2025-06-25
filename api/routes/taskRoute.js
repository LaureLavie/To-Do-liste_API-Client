const express = require("express");
const Task = require("../models/task");
const verifyToken = require("../util/verifyToken");

const router = express.Router();

// router.get("/task", verifyToken, async (req, res) => {
//   try {
//     console.log("hello");
//     const tasks = await Task.find({ userId: req.user.id });
//     res.json(tasks);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch tasks" });
//   }
// });
router.get("/task", verifyToken, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
});

//Créer une tâche
router.post("/task", verifyToken, async (req, res) => {
  try {
    const { title } = req.body; //const title=req.body.title

    if (!title || title.trim().length === 0) {
      return res.status(400).json({
        message: "Champs requis",
      });
    }
    const task = { title, userId: req.user.id };
    await Task.create(task);
    res.status(201).json({
      message: "Une tâche a été ajoutée",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

router.delete("/task/:id", verifyToken, async (req, res) => {
  // const {id}=req.params;

  const id = req.params.id;
  try {
    await Task.findByIdAndDelete(id);
    res.status(200).json({
      message: "Tâche a été supprimée",
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression d'une tâche" });
  }
});

router.put("/task/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const task = req.body;
  await Task.findByIdAndUpdate(id, task);
  res.status(200).json({
    message: "La tâche a été modifiée",
  });
});

module.exports = router;
