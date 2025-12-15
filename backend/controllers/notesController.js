const { notesModel } = require("../models/notesModel");

//Create a note
const createNote = async (req, res) => {
  const note = req.body;
  let newNote = new notesModel(note);
  let savedNote = await newNote.save();
  console.log("Received note:", savedNote);
  res.status(200).json({ message: "Note received successfully", note });
};

//Search and Get all Notes
const getAllNotes = async (req, res) => {
  try {
    const { search } = req.query;

    let query = {};
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { content: { $regex: search, $options: "i" } },
        ],
      };
    }

    const notes = await notesModel.find(query).sort({ updatedAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

//find a note
const getNoteById = async (req, res) => {
  let { id } = req.params;
  let note = await notesModel.findById(id);
  console.log(note);
  res.status(200).json(note);
};

//Update a note
const updatedANote = async (req, res) => {
  try {
    const { id } = req.params;
    const noteData = req.body;

    const updatedNote = await notesModel.findByIdAndUpdate(
      id,
      { ...noteData, modifiedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({
      message: "Note updated successfully",
      note: updatedNote,
    });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//delete a note
const deleteANote = async (req, res) => {
  let { id } = req.params;
  let deleteNote = await notesModel.findByIdAndDelete(id);
  res.status(200).json(deleteNote);
};

module.exports = {createNote,getAllNotes,getNoteById,updatedANote,deleteANote};