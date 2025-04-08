import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center w-full bg-base-200 px-6">
      <div className="text-center bg-base-100 p-8 rounded-lg shadow-lg max-w-md">
        <h1 className="text-3xl font-bold text-primary">Task Manager</h1>
        <h2 className="text-lg font-normal text-secondary">
          Stay Organized and Be Productive!
        </h2>
        <p className="text-gray-600 mt-2">Log in or sign up to get started.</p>
        <div className="mt-12">
          <img
            src="/homeImg.svg"
            alt="home"
            className="max-w-lg w-full mx-auto"
          />
        </div>
        <div className="mt-6 space-x-4">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
