import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { MdEdit, MdDelete, MdArrowBack } from "react-icons/md";

const ViewNote = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  //View Note by ID
  useEffect(() => {
    const viewNote = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (err) {
        console.error("Error in getting note:", err);
        setStatus("error");
      } finally {
        setLoading(false);
      }
    };
    if (id) viewNote();
  }, [id]);

  //Delete Note
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;
    try {
      await api.delete(`/notes/${id}`);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error deleting note:", err);
      alert("Failed to delete note. Please try again.");
    }
  };

  // Edit Note
  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  // Go Back
  const handleBack = () => {
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading note...</p>
      </div>
    );
  }

  if (status === "error" || !note) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600 text-lg">Failed to load note. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 px-4 py-10 w-full overflow-x-hidden">
      {/* Back Button */}
      <div className="w-full max-w-3xl mb-5 flex items-center">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition shadow-sm"
        >
          <MdArrowBack className="text-lg" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Note Card */}
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 overflow-hidden">
        {/* Title & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-4 mb-4 w-full">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 wrap-break-word w-full">
            {note.title || "Untitled Note"}
          </h1>

          <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
            >
              <MdEdit className="text-lg" />
              <span>Edit</span>
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
            >
              <MdDelete className="text-lg" />
              <span>Delete</span>
            </button>
          </div>
        </div>

        {/* Date */}
        <p className="text-sm text-gray-500 mb-4 wrap-break-word w-full">
          Last updated:{" "}
          {new Date(note.updatedAt || note.createdAt).toLocaleString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>

        {/* Content */}
        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-[15px] break-words w-full max-w-full">
          {note.content || "No content available."}
        </div>
      </div>
    </div>
  );
};

export default ViewNote;
