import { Note } from "../models/Note.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(notes);
});

export const createNote = asyncHandler(async (req, res) => {
  const { text } = req.body;

  if (!text || !text.trim()) {
    res.status(400);
    throw new Error("Note text is required");
  }

  const note = await Note.create({
    user: req.user._id,
    text: text.trim()
  });

  res.status(201).json(note);
});

export const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findOne({
    _id: req.params.id,
    user: req.user._id
  });

  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  await note.deleteOne();

  res.json({ message: "Note deleted successfully", id: req.params.id });
});

