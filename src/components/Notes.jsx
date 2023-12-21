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
  onCreate,
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
        if (noteData.id) {
          onUpdate(noteData);
          console.log("Updating note");
        } else {
          onCreate(noteData);
          console.log("Creating note");
        }
        setNoteClassname({
          opacity: 5,
          shadow: "md",
        });
        setClicked(false);
      }
    };

    if (clicked) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [clicked]);

  const handleClick = () => {
    setNoteClassname({
      opacity: 10,
      shadow: "xl",
    });
    setClicked(true);
  };

  const handleArrowClick = () => {
    console.log("Arrow clicked: Opening modal");
  };

  const handleTitleChange = (e) => {
    setNoteData((prevData) => {
      return {
        ...prevData,
        title: e.target.value,
      };
    });
  };

  const handleBodyChange = (e) => {
    setNoteData((prevData) => {
      return {
        ...prevData,
        description: e.target.value,
      };
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
