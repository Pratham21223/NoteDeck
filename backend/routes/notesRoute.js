const express = require("express");
const { getAllNotes, getNoteById, createNote, updatedANote, deleteANote } = require("../controllers/notesController");
const router = express.Router();

router.get("/",getAllNotes);
router.get("/:id",getNoteById);
router.post("/create",createNote);
router.put("/:id",updatedANote);
router.delete("/:id",deleteANote)

module.exports = router;