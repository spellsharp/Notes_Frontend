import React, { useState, useEffect, useRef } from "react";
import { FaTags, FaTrash } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";

const Notes = ({
  propstitle,
  propsbody,
  propstags,
  propsid,
  onDelete,
  onUpdate,
}) => {
  const [clicked, setClicked] = useState(false);
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

    // Use useEffect to execute code after the state has been updated
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
    console.log("Tags");
  };

  return (
    <div
      ref={editableRef}
      onClick={handleClick}
      className={`shadow-${noteClassname.shadow} border border-opacity-${noteClassname.opacity} border-white shadow-slate-950 rounded-3xl text-white max-w-[400px] min-h-[250px] p-7`}
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
                  className={`text-black rounded-3xl text-sm  px-2`}
                  style={{ backgroundColor: noteData.tags.color }}
                >
                  {noteData.tags.name}
                </div>
              </div>
            ) : (
              <></>
            )}
            <div className="mt-5 float-right flex space-x-5">
              <button onClick={handleTags}>
                <FaTags />
              </button>
              <button onClick={() => onDelete(propsid)}>
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
