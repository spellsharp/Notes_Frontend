import React, { useState, useEffect, useRef } from "react";

const Notes = ({ propstitle, propsbody }) => {
  const [clicked, setClicked] = useState(false);
  const [title, setTitle] = useState(propstitle);
  const [body, setBody] = useState(propsbody);
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

  return (
    <div
      ref={editableRef}
      onClick={handleClick}
      className="border border-white border-opacity-20 shadow-xl rounded-3xl text-white max-w-[400px] max-h-[250px] p-7">
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
        </div>
      )}
    </div>
  );
};

export default Notes;
