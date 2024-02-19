import React, { useState, useEffect, useRef, useContext } from "react";
import { FaTrash, FaCalendar } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import NotesModal from "./NotesModal";
import CalendarModal from "./CalendarModal";
import AuthContext from "../context/AuthContext";
import NotesMenu from "./NotesMenu";

const Notes = ({
  propstitle,
  propsauthor,
  propsbody,
  propsid,
  propsdeadline,
  propsispublic,
  onDelete,
  onUpdate,
  editable = false,
}) => {
  const tokens = JSON.parse(localStorage.getItem("authTokens"));
  const [clicked, setClicked] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [noteClassname, setNoteClassname] = useState({
    opacity: 5,
    shadow: "md",
  });
  const [noteData, setNoteData] = useState({
    id: propsid,
    author: propsauthor,
    title: propstitle,
    description: propsbody,
    deadline: propsdeadline,
    is_public: propsispublic,
  });
  const editableRef = useRef(null);

  const { user, logoutUser } = useContext(AuthContext);

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
    }
  }, [clicked, noteData]);

  useEffect(() => {
    const updateNote = () => {
      if (noteData.id) {
        onUpdate(noteData);
      }
    };

    updateNote();
  }, [noteData]);

  const onCreate = async (data) => {
    try {
      const response = await fetch(`http://localhost:8000/notes/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + tokens["access"],
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
  };

  const handleTitleChange = (e) => {
    setNoteData((prevData) => {
      const newData = {
        ...prevData,
        title: e.target.value,
      };
      return newData;
    });
  };

  const handleBodyChange = (e) => {
    setNoteData((prevData) => {
      const newData = {
        ...prevData,
        description: e.target.value,
      };
      return newData;
    });
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(propsid);
  };

  const handleModalClose = (e) => {
    setShowNotesModal(false);
    setShowCalendarModal(false);
  };

  const handleCalendar = (e) => {
    e.stopPropagation();
    setShowCalendarModal(true);
  };

  const handleNoteUpdate = (data) => {
    setNoteData(data);
    onUpdate(noteData);
  };

  const handleDeadlineChange = (date) => {
    setNoteData((prevData) => {
      const newData = {
        ...prevData,
        deadline: date,
      };
      return newData;
    });
  };

  const handlePublicChange = (e) => {
    const newValue = e.target.checked;
    setNoteData((prevData) => ({
      ...prevData,
      is_public: newValue,
    }));
  };

  // const author = noteData.author["username"];

  return (
    <>
      <div
        ref={editableRef}
        onClick={handleClick}
        className={`shadow-${noteClassname.shadow} shadow-slate-950 rounded-xl border border-white border-opacity-10 text-white max-w-[400px] min-h-[250px] p-7 hover:border-opacity-10`}
      >
        {clicked && editable ? (
          <div className="h-full">
            <div className="flex">
              <input
                className="bg-transparent max-w-full border-none outline-none text-xl font-bold mb-4"
                value={noteData.title}
                onChange={handleTitleChange}
                placeholder="Title"
              ></input>
              <div className="hover:opacity-70 text-3xl cursor-pointer">
                <MdArrowOutward onClick={handleArrowClick} />
              </div>
            </div>
            <hr className="opacity-5" />
            <br />
            <textarea
              className="flex justify-end bg-transparent border-none outline-none min-w-full min-h-[75%] text-white overflow-hidden resize-none"
              value={noteData.description}
              onChange={handleBodyChange}
              placeholder="Take a note..."
            ></textarea>
          </div>
        ) : (
          <div className="overflow-hidden flex flex-col h-full justify-between">
            <div>
              <div className="flex justify-between">
                <h1 className="text-xl font-bold mb-4">
                  {noteData.title === "" && noteData.description === "" ? (
                    <p className="text-gray-400">Empty Note</p>
                  ) : (
                    noteData.title
                  )}
                </h1>
                <div className="hover:opacity-70 text-3xl cursor-pointer">
                  <MdArrowOutward onClick={handleArrowClick} />
                </div>
              </div>
              <hr className="opacity-5" />
              <br />
              <p className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                {noteData.description}
              </p>
            </div>
            <div className="space-y-1">
              {editable && (
                <div onClick={(e) => e.stopPropagation()}>
                  <NotesMenu
                    noteData={noteData}
                    onCalendar={handleCalendar}
                    onDelete={handleDelete}
                    onPublicChange={handlePublicChange}
                  />
                </div>
              )}
              <div>
                <p className="opacity-40 text-sm">
                  {/* {author} */}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      {showNotesModal && (
        <NotesModal
          propsid={noteData.id}
          propstitle={noteData.title}
          propsbody={noteData.description}
          propsdeadline={noteData.deadline}
          onUpdate={handleNoteUpdate}
          isOpen={showNotesModal}
          onClose={handleModalClose}
          editable={editable}
        />
      )}
      {showCalendarModal && (
        <CalendarModal
          isOpen={showCalendarModal}
          onClose={handleModalClose}
          onDeadlineChange={handleDeadlineChange}
        />
      )}
    </>
  );
};

export default Notes;
