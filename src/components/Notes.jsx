import React, { useState, useEffect, useRef } from "react";
import { FaTrash, FaCalendar } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import NotesModal from "./NotesModal";

const Notes = ({ propstitle, propsbody, propsid, onDelete, onUpdate }) => {
  const [clicked, setClicked] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [noteClassname, setNoteClassname] = useState({
    opacity: 5,
    shadow: "md",
  });
  const [noteData, setNoteData] = useState({
    id: propsid,
    title: propstitle,
    description: propsbody,
  });
  const editableRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (editableRef.current && !editableRef.current.contains(e.target)) {
        setNoteClassname({
          opacity: 5,
          shadow: "md",
        });
        setClicked(false);
      }
    };

    if (clicked) {
      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }

    if (!clicked && noteData.id === "") {
      onCreate(noteData);
      console.log("Creating note: ", noteData);
    }
  }, [clicked, noteData]);

  useEffect(() => {
    const updateNote = () => {
      if (noteData.id) {
        onUpdate(noteData);
        console.log("Updating note: ", noteData);
      }
    };

    updateNote();
  }, [noteData]);
  const onCreate = async (data) => {
    console.log("Create: ", data);
    try {
      const response = await fetch(`http://localhost:8000/notes/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.error("Failed to create note:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClick = () => {
    setNoteClassname({
      opacity: 0,
      shadow: "xl",
    });
    setClicked(true);
  };

  const handleArrowClick = () => {
    setShowNotesModal(true);
    console.log("Arrow clicked: Opening modal");
  };

  const handleTitleChange = (e) => {
    setNoteData((prevData) => {
      const newData = {
        ...prevData,
        title: e.target.value,
      };
      console.log("Changed title: ", newData);
      return newData;
    });
  };

  const handleBodyChange = (e) => {
    setNoteData((prevData) => {
      const newData = {
        ...prevData,
        description: e.target.value,
      };
      console.log("Changed body: ", newData);
      return newData;
    });
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(propsid);
  };

  const handleModalClose = (e) => {
    setShowNotesModal(false);
    console.log("Parent: Modal closed");
  };

  return (
    <>
      <div
        ref={editableRef}
        onClick={handleClick}
        className={`shadow-${noteClassname.shadow} border border-opacity-${noteClassname.opacity} border-white  shadow-slate-950 rounded-3xl text-white max-w-[400px] min-h-[250px] p-7 hover:border-opacity-10`}
      >
        {clicked ? (
          <div className="h-full">
            <div className="flex">
              <input
                className="bg-transparent max-w-full border-none outline-none text-xl font-bold mb-4"
                value={noteData.title}
                onChange={handleTitleChange}
                placeholder="Title"
              ></input>
              <div>
                <MdArrowOutward
                  fontSize={"25px"}
                  onClick={handleArrowClick}
                  cursor={"pointer"}
                />
              </div>
            </div>
            <hr className="opacity-5" />
            <br />
            <textarea
              className="flex justify-end bg-transparent border-none outline-none min-w-full min-h-[75%] text-white overflow-hidden"
              value={noteData.description}
              onChange={handleBodyChange}
              placeholder="Take a note..."
            ></textarea>
          </div>
        ) : (
          <div className="overflow-hidden flex flex-col h-full justify-between">
            <div>
              <h1 className="text-xl font-bold mb-4">
                {noteData.title === "" && noteData.description === "" ? (
                  <p className="text-gray-400">Empty Note</p>
                ) : (
                  noteData.title
                )}
              </h1>
              <hr className="opacity-5" />
              <br />
              <p className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                {noteData.description}
              </p>
            </div>

            <div className="flex justify-between">
              <div className="mt-5 flex space-x-5 text-gray-500">
                <button
                  onClick={console.log("Clicked")}
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
          </div>
        )}
      </div>
      {showNotesModal && (
        <NotesModal
          propstitle={noteData.title}
          propsbody={noteData.description}
          isOpen={showNotesModal}
          onClose={handleModalClose}
        />
      )}
    </>
  );
};

export default Notes;
