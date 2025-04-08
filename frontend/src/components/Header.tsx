import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("token") || false;

  if (!isLoggedIn) return null;

  return (
    <header className="navbar bg-base-100 shadow-md px-4">
      <div className="navbar-start flex items-center gap-2">
        <FaTasks className="w-6 h-6 text-primary" />
        <a className="btn btn-ghost normal-case text-xl text-primary">
          Task Manager
        </a>
      </div>

      <div className="navbar-end flex items-center gap-4">
        <FaUserCircle className="w-8 h-8 text-gray-500 cursor-pointer hover:text-gray-700" />

        <button
          className="btn btn-outline btn-sm bg-primary text-white"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          Log Out
        </button>
      </div>
    </header>
  );
};

export default Header;
