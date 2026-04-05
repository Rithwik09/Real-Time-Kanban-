import express from "express";
import Board from "../models/board.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

// Create board
router.post("/", auth, async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ msg: "Title is required" });
    }
    const board = await Board.create({
      title: req.body.title,
      userId: req.user.id,
      columns: []
    });
    res.json(board);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Get board
router.get("/:id", auth, async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ msg: "Board not found" });
    }
    res.json(board);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Update board (FULL SAVE)
router.patch("/:id", auth, async (req, res) => {
  try {
    const board = await Board.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!board) {
      return res.status(404).json({ msg: "Board not found" });
    }
    res.json(board);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

export default router;