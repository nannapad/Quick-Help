import React from "react";

const Footer = () => {
  return (
    <footer className="bg-purple-400 dark:bg-purple-800 text-white p-4 mt-auto text-center">
      &copy; {new Date().getFullYear()} Quick Help
    </footer>
  );
};

export default Footer;
