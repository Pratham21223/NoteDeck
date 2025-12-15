import React, { useState } from "react";
import axios from "axios";
const CreateNotes = () => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({ title: "", content: "" });
  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    if (!note.title.trim() && !note.content.trim()) return;
    setNotes([...notes, note]);
    sendData();
    setNote({ title: "", content: "" });
  };
  const sendData = async () => {
    try {
      const res = await axios.post("http://localhost:3000/createnote", [...notes, note]);
      setResponse(res.data.message);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex items-center justify-center mt-28">
      <div className="border rounded bg-white px-7 py-10">
        <h4 className="text-2xl mb-7">Create a new Note</h4>
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="input-box"
          onChange={handleChange}
          value={note.title}
        />
        <textarea
          name="content"
          cols="30"
          rows="10"
          placeholder="Content"
          className="input-box"
          onChange={handleChange}
          value={note.content}
        ></textarea>
        <button className="btn-primary" onClick={handleSubmit}>
          Create Note
        </button>
      </div>
    </div>
  );
};

export default CreateNotes;
