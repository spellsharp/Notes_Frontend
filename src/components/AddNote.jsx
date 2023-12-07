import React from "react";
import { FaPlus } from "react-icons/fa";
const AddNote = () => {
  return (
    <>
      <button className="rounded-full border border-white border-opacity-0 p-5 max-w-fit max-h-fit bg-blue-500 hover:border-opacity-70">
        <FaPlus size={"30px"} color={"white"} />
      </button>
    </>
  );
};

export default AddNote;
