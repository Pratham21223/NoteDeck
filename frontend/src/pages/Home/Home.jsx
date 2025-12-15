import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { MdAdd } from "react-icons/md";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { backendPort } from "../../utils/helper";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Extract ?search=term from URL
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";

  // ✅ Fetch notes (with optional search)
  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendPort}/notes`, {
        params: { search: searchQuery },
      });
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch when page loads OR when search query changes
  useEffect(() => {
    fetchNotes();
  }, [searchQuery]);

  // ✅ Delete note
  const onDelete = async (id) => {
    try {
      await axios.delete(`${backendPort}/notes/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  // ✅ Edit note
  const onEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  //View Note
  const onClick= (id) => {
    navigate(`/note/${id}`);
  };
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        {loading ? (
          <p className="text-center text-gray-500 mt-10">Loading notes...</p>
        ) : notes.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            {searchQuery
              ? `No notes found for "${searchQuery}"`
              : "No notes available. Create one!"}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                content={note.content}
                date={new Date(note.updatedAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
                onEdit={() => onEdit(note._id)}
                onDelete={() => onDelete(note._id)}
                onClick={()=> onClick(note._id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Floating Create Button */}
      <Link
        to="/createnote"
        className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-primary hover:bg-blue-600 fixed right-6 bottom-6 sm:right-10 sm:bottom-10 shadow-lg transition-transform transform hover:scale-105"
        aria-label="Create note"
      >
        <MdAdd className="text-[28px] sm:text-[32px] text-white" />
      </Link>
    </>
  );
};

export default Home;
