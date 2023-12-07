import React from "react";
import { FaPlus } from "react-icons/fa";
const AddNote = () => {
  return (
    <>
      <button className="rounded-xl p-5 max-w-fit max-h-fit bg-violet-500 hover:bg-violet-600">
        <FaPlus size={"30px"} color={"white"} />
      </button>
    </>
  );
};

export default AddNote;
