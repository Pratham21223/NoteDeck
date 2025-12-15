const { model, Schema } = require('mongoose');

const NotesSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
},{timestamps:true});

const notesModel = model('Note', NotesSchema);

module.exports = { notesModel };
