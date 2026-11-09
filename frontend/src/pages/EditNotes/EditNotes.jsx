import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { useNavigate, useParams } from "react-router-dom";

const EditNote = () => {
  const { id } = useParams();
  const [note, setNote] = useState({ title: "", content: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data || { title: "", content: "" });
      } catch (err) {
        console.error("Error fetching note:", err);
        setStatus("error");
      }
    };
    if (id) fetchNote();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prev) => ({ ...prev, [name]: value }));
    if (status) setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!note.title.trim() && !note.content.trim()) return;
    setLoading(true);
    try {
      await api.put(`/notes/${id}`, note);
      setStatus("success");
      navigate(`/note/${id}`, { replace: true });
    } catch (err) {
      console.error("Error updating note:", err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-3xl bg-white border rounded-lg shadow-md p-6 sm:p-8 flex flex-col justify-between h-[85vh]">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800">
          Edit Note
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-between flex-1 mt-6 space-y-4"
        >
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Title"
            className="input-box w-full text-lg py-2 px-4 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            onChange={handleChange}
            value={note.title}
            autoFocus
          />

          <textarea
            id="content"
            name="content"
            placeholder="Edit your content here..."
            className="w-full flex-1 border rounded-md p-4 text-[15px] leading-relaxed resize-none focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-50 min-h-[35vh] max-h-[40vh]"
            onChange={handleChange}
            value={note.content}
          />

          <div className="flex flex-col sm:flex-row sm:justify-end sm:gap-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full sm:w-auto px-6 py-2.5 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto px-6 py-2.5 border rounded-md text-gray-700 hover:bg-gray-100 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>

        {status === "success" && (
          <p className="text-green-600 text-center mt-3">
            Note updated successfully!
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 text-center mt-3">
            Failed to update note. Try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default EditNote;
