import React from "react";

const Error403: React.FC = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-error">500 - Internal Server Error</h1>
          <p className="py-6 text-xl text-gray-700">
            Something went wrong. Please try again.
          </p>
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="btn btn-primary"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error403;
