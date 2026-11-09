import React from "react";
import { MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({ title, date, content, onEdit, onDelete,onClick }) => {
  return (
    <article className="border rounded-lg p-4 bg-white hover:shadow-xl transition-all ease-in-out">
      <div onClick={onClick}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h6 className="text-lg sm:text-xl font-semibold wrap-break-word">
            {title}
          </h6>
          <span className="text-xs text-slate-500">{date}</span>
        </div>
      </div>

      <p className="text-slate-600 mt-3 text-sm wrap-break-word max-h-[5.2rem] overflow-hidden">
        {content}
      </p>
      </div>
      <div className="flex items-center gap-3 mt-3">
        <button
          aria-label="Edit note"
          onClick={onEdit}
          className="p-2 rounded hover:bg-slate-100 transition"
        >
          <MdCreate className="text-slate-600 hover:text-green-600" />
        </button>

        <button
          aria-label="Delete note"
          onClick={onDelete}
          className="p-2 rounded hover:bg-slate-100 transition"
        >
          <MdDelete className="text-slate-600 hover:text-red-600" />
        </button>
      </div>
    </article>
  );
};

export default NoteCard;
