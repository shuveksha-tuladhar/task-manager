import React from "react";

const Error403: React.FC = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-error">403 - Forbidden</h1>
          <p className="py-6 text-xl text-gray-700">
            Please log in.
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

export default Error403;
