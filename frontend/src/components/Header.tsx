import React, { useEffect } from "react";
import {FaTasks } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getApi } from "../util/api";
import { useUserStore } from "../stores/useUserStore";
import { User } from "./types/UserType";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const isLoggedIn = Boolean(localStorage.getItem("token") || false);
  const { user, setUser, clearUser } = useUserStore();

  useEffect(() => {
    if (isLoggedIn && !user) {
      getApi<User>("/api/users/profile")
        .then((resp) => {
          console.log(resp.data);
          setUser(resp.data as User);
        })
        .catch((error) => console.error("Failed to fetch user info:", error));
    }
  }, [isLoggedIn, user, setUser]);

  if (!isLoggedIn) return null;

  return (
    <header className="navbar bg-base-100 shadow-md px-4">
  <div className="navbar-start gap-4">
    <FaTasks className="w-6 h-6 text-primary" />
    <span className="font-bold text-2xl text-primary">Task Manager</span>
  </div>

  <div className="navbar-center">
    {user?.name && (
      <div className="hidden sm:flex items-center space-x-4">
        <div className="font-medium text-lg text-indigo-700">Welcome, {user.name} !</div>
      </div>
    )}
    </div>
    <div className="navbar-end gap-4">
    <button
      className="btn btn-primary btn-sm text-white normal-case"
      onClick={() => {
        localStorage.removeItem("token");
        clearUser();
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
