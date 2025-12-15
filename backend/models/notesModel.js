const { model, Schema } = require("mongoose");

const NotesSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }, //Storing user notes
}, { timestamps: true });


const notesModel = model("Note", NotesSchema);

module.exports = { notesModel };
