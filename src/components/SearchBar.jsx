import React, { useState } from "react";
import Toggle from "react-toggle";
import "../styles/Toggle.css";
const SearchBar = ({ onToggleChange }) => {
  const handleToggle = () => {
    setToggle(!toggle);
    onToggleChange(toggle);
  };
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div className="flex items-center space-x-4">
        <input
          className="rounded-xl shadow-lg shadow-slate-950 w-full max-w-xl border border-white border-opacity-20 outline-none p-5 bg-violet-500 text-white placeholder:text-white focus:bg-violet-600"
          placeholder="Search"
        ></input>
        <div className="flex items-center space-x-2  p-3 bg-black bg-opacity-20 rounded-xl shadow-md shadow-slate-950">
          <Toggle
            id="cheese-status"
            defaultChecked={false}
            onChange={() => handleToggle()}
          />
          <label className="text-white font-semibold">Global Search</label>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
