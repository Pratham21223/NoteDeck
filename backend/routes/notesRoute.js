const express = require("express");
const { 
  getAllNotes, 
  getNoteById, 
  createNote, 
  updatedANote, 
  deleteANote 
} = require("../controllers/notesController");
const { verifyToken } = require("../middlewares/authMiddleware");


const router = express.Router();

//Protect all routes using JWT so that only loggedIn user can check it.
router.use(verifyToken);

// Routes
router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/create", createNote);
router.put("/:id", updatedANote);
router.delete("/:id", deleteANote);

module.exports = router;
