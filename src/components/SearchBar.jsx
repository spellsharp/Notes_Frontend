import React from "react";

const SearchBar = () => {
  return (
    <>
      <div>
        <input className="rounded-xl w-full max-w-xl border border-white border-opacity-20 outline-none p-5 bg-violet-500 text-white placeholder:text-white focus:bg-violet-600" placeholder="Search"></input>
      </div>
    </>
  );
};

export default SearchBar;
