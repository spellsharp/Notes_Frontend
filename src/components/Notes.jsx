import React, { useState, useEffect, useRef } from "react";
import { FaTags, FaTrash } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import NotesModal from "./NotesModal";

const Notes = ({
  propstitle,
  propsbody,
  propstags,
  propsid,
  onDelete,
  onUpdate,
}) => {
  const [clicked, setClicked] = useState(false);
  const [hoverTag, setHoverTag] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [noteClassname, setNoteClassname] = useState({
    opacity: 5,
    shadow: "md",
  });
  const [noteData, setNoteData] = useState({
    id: propsid,
    title: propstitle,
    description: propsbody,
    tags: propstags,
  });
  const [showTagsDropdown, setShowTagsDropdown] = useState(false);
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

  const handleTags = (e) => {
    e.stopPropagation();
    setShowTagsDropdown((prev) => !prev);
    console.log("Tags");
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(propsid);
  };
  const tagRemove = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to remove this tag?")) {
      console.log("Removed tag: ", noteData.tags);
      setNoteData((prevData) => {
        const newData = {
          ...prevData,
          tags: {},
        };
        console.log("Removed tag: ", newData);
        return newData;
      });
    } else {
      console.log("Tag not removed");
    }
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
        className={`shadow-${noteClassname.shadow} border border-opacity-${noteClassname.opacity} border-white shadow-slate-950 rounded-3xl text-white max-w-[400px] min-h-[250px] p-7 hover:border-opacity-10`}
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
              {noteData.tags ? (
                <div className="mt-5 flex space-x-3">
                  <div
                    key={noteData.tags.id}
                    className={`text-black rounded-3xl text-sm px-2 cursor-pointer flex justify-between`}
                    onPointerEnter={() => {
                      console.log("Hovered");
                      setHoverTag(true);
                    }}
                    onPointerLeave={() => {
                      console.log("Hover Stopped");
                      setHoverTag(false);
                    }}
                    style={{ backgroundColor: noteData.tags.color }}
                  >
                    <div>{noteData.tags.name}</div>
                    <div
                      className={`font-semibold text-center -mr-1 ${
                        hoverTag
                          ? "opacity-100 bg-opacity-100 px-1"
                          : "opacity-0 bg-opacity-0"
                      } transition-all duration-300 rounded-full`}
                      style={{ backgroundColor: noteData.tags.color }}
                      onClick={tagRemove}
                    >
                      &#10005;
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-xs p-2">No tags added</div>
              )}
              <div className="mt-5 float-right flex space-x-5 text-gray-500">
                <button
                  onClick={handleTags}
                  className="hover:text-white transition-colors duration-200"
                >
                  <FaTags />
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
