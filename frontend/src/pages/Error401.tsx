import React from "react";

const Error401: React.FC = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-error">401 - Unauthorized</h1>
          <p className="py-6 text-xl text-gray-700">
            You do not have permission to view this page. Please log in.
          </p>
          <button
            onClick={() => window.location.href = '/login'}
            className="btn btn-primary"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error401;
