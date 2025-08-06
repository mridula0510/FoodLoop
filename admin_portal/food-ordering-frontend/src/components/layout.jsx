import React from "react";
import Navbar from "./Navbar"; // Ensure file is 'Navbar.jsx' exactly

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;
