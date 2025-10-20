import React from "react";

const Sidebar = () => {
  return (
    <aside className="bg-purple-600 text-white w-64 p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Quick Help</h1>
      <ul>
        <li className="py-2 hover:bg-purple-500 cursor-pointer">Home</li>
        <li className="py-2 hover:bg-purple-500 cursor-pointer">Manuals</li>
        <li className="py-2 hover:bg-purple-500 cursor-pointer">Settings</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
