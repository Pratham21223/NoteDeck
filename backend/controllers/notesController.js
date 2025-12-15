const { notesModel } = require("../models/notesModel");
const { User } = require("../models/userModel"); // ✅ Correct import

// Create note
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.userId;

    const newNote = new notesModel({ title, content, user: userId });
    const savedNote = await newNote.save();

    // push note ID into user's notes array
    await User.findByIdAndUpdate(userId, { $push: { notes: savedNote._id } });

    console.log("Received note:", savedNote);
    res.status(201).json({ message: "Note created successfully", note: savedNote });
  } catch (err) {
    console.error("Error creating note:", err);
    res.status(500).json({ message: "Failed to create note" });
  }
};

//Get all notes
const getAllNotes = async (req, res) => {
  try {
    const { search } = req.query;
    const userId = req.userId;

    let query = { user: userId };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    const notes = await notesModel.find(query).sort({ updatedAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

// Get one Note by ID
const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const note = await notesModel.findOne({ _id: id, user: userId });
    if (!note) return res.status(404).json({ message: "Note not found" });

    console.log("Fetched note:", note);
    res.status(200).json(note);
  } catch (err) {
    console.error("Error fetching note:", err);
    res.status(500).json({ message: "Failed to fetch note" });
  }
};

//Update Note by ID
const updatedANote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const updatedNote = await notesModel.findOneAndUpdate(
      { _id: id, user: userId },
      { ...req.body, modifiedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedNote) return res.status(404).json({ message: "Note not found" });

    res.status(200).json({
      message: "Note updated successfully",
      note: updatedNote,
    });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Delete note
const deleteANote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const deletedNote = await notesModel.findOneAndDelete({ _id: id, user: userId });
    if (!deletedNote) return res.status(404).json({ message: "Note not found" });
    await User.findByIdAndUpdate(userId, { $pull: { notes: id } });

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createNote, getAllNotes, getNoteById, updatedANote, deleteANote };
