import React, { useState, useEffect, useRef } from "react";
import { FaTags, FaTrash } from "react-icons/fa";

const Notes = ({ propstitle, propsbody, propstags }) => {
  const [clicked, setClicked] = useState(false);
  const [title, setTitle] = useState(propstitle);
  const [body, setBody] = useState(propsbody);
  const [tags, setTags] = useState(propstags);
  const editableRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (editableRef.current && !editableRef.current.contains(e.target)) {
        console.log("Clicked outside the div. Sending post request...");
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
    setClicked(true);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleTags = (e) => {
    e.stopPropagation();
    console.log("Tags");
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    console.log("Delete");
  }

  return (
    <div
      ref={editableRef}
      onClick={handleClick}
      className="border border-white border-opacity-20 shadow-xl rounded-3xl text-white max-w-[400px] max-h-[250px] p-7"
    >
      {clicked ? (
        <>
          <input
            className="bg-transparent max-w-full border-none outline-none"
            value={title}
            onChange={handleTitleChange}
            placeholder="Title"
          ></input>
          <textarea
            className="flex justify-end bg-transparent border-none outline-none min-w-full min-h-full text-white"
            value={body}
            onChange={handleBodyChange}
            placeholder="Take a note..."
          ></textarea>
        </>
      ) : (
        <div className="overflow-hidden">
          <h1 className="text-xl font-bold mb-4">
            {title === "" && body === "" ? (
              <p className="text-gray-400">Empty Note</p>
            ) : (
              title
            )}
          </h1>
          <p className="overflow-hidden whitespace-nowrap overflow-ellipsis">
            {body}
          </p>
          <div className="mt-5 flex space-x-3">
            {tags.map((tag, key) => (
              <div className="rounded-3xl text-sm border border-gray-400 px-2">
                {tag}
              </div>
            ))}
          </div>
          <div className="mt-5 float-right flex space-x-5">
            <button onClick={handleTags}>
              <FaTags />
            </button>
            <button onClick={handleDelete}><FaTrash /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
