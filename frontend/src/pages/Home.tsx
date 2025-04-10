import React from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center flex-col justify-center w-full bg-base-200 px-6 ">
      <Title />
      <div className="text-center bg-base-100 p-8 rounded-lg w-[50%]">
        <p className="text-gray-600 mt-2">Log in or sign up to get started.</p>
        <div className="mt-6">
          <img
            src="/homeImg.svg"
            alt="home"
            className="max-w-lg w-full mx-auto h-[400px]"
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
