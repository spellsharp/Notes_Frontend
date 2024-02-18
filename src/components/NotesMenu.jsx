import React from "react";
import { FaTrash, FaCalendar } from "react-icons/fa";

const NotesMenu = ({ noteData, onCalendar, onDelete, onPublicChange }) => {
  const handleDelete = (e) => {
    onDelete(e);
  };
  const handleCalendar = (e) => {
    onCalendar(e);
  };
  const handlePublicChange = (e) => {
    onPublicChange(e);
  };

  const formattedDate = noteData.deadline
    ? new Date(noteData.deadline).toLocaleDateString()
    : "No deadline";
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center justify-between space-x-2">
        <input
          type="checkbox"
          checked={noteData.is_public}
          onChange={(e) => handlePublicChange(e)}
        />
        <p className="text-sm text-gray-500">
          {noteData.is_public ? "Public" : "Private"}
        </p>
      </div>
      <div
        className="flex space-x-5 text-gray-500 w-fit pl-10 items-center"
      >
        <div className="text-sm">{formattedDate}</div>
        <button
          onClick={handleCalendar}
          className="hover:text-white transition-colors duration-200"
        >
          <FaCalendar />
        </button>
        <button
          onClick={handleDelete}
          className="hover:text-white transition-colors duration-200"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default NotesMenu;
