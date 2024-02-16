import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import AuthContext from "../context/AuthContext";
const Header = () => {
  const linkstyle = {
    textDecoration: "none",
    color: "white",
  };
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <div className="">
      {user ? (
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Welcome, {user.username}</h1>
          <button
            onClick={logoutUser}
            style={linkstyle}
            className="flex justify-end font-bold text-3xl"
          >
            <IoIosLogOut />
          </button>
        </div>
      ) : (
        <Link to="/login" style={linkstyle}></Link>
      )}
    </div>
  );
};

export default Header;
