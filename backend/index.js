require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/notemaster";
const { notesModel } = require("./models/notesModel");
const notesRoutes = require("./routes/notesRoute");

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log("Server Started");
  mongoose
    .connect(uri)
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((err) => {
      console.log("MongoDB connection error:", err);
      console.log("Connecting to local host");
      uri = "mongodb://127.0.0.1:27017/notemaster";
    });
});

app.use("/notes", notesRoutes);

//Create Note
app.post("/notes/create", async (req, res) => {
  const note = req.body;
  let newNote = new notesModel(note);
  let savedNote = await newNote.save();
  console.log("Received note:", savedNote);
  res.status(200).json({ message: "Note received successfully", note });
});

//Find all notes
app.get("/notes", async (req, res) => {
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
});
//find a note by
app.get("/notes/:id", async (req, res) => {
  let { id } = req.params;
  let note = await notesModel.findById(id);
  console.log(note);
  res.status(200).json(note);
});

//Update Note
app.put("/notes/:id", async (req, res) => {
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
});

//delete note
app.delete("/notes/:id", async (req, res) => {
  let { id } = req.params;
  let deleteNote = await notesModel.findByIdAndDelete(id);
  res.status(200).json(deleteNote);
});
