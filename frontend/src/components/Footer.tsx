import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black bg-opacity-70 text-white text-center py-2 w-full fixed bottom-0 z-50 flex justify-center items-center text-sm">
      Made with <span className="text-red-500 px-1"> ❤️ </span> by Shuveksha Tuladhar &copy; {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;