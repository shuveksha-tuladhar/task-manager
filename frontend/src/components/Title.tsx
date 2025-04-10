import React from "react";

const Title: React.FC = () => {
  return (
      <div className="text-center bg-base-100 p-8 rounded-lg w-[50%]">
        <h1 className="text-3xl font-bold text-primary">Task Manager</h1>
        <h2 className="text-lg font-normal text-secondary">
          Stay Organized and Be Productive!
        </h2>
      </div>
  );
};

export default Title;
