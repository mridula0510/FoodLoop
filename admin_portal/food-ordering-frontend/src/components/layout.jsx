import React from "react";
import Navbar from "./Navbar"; // Ensure file name matches exactly

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* Fixed Navbar */}
      <Navbar />
      
      {/* Push content below navbar */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-4 mt-16">
        {children}
      </main>
    </div>
  );
};

export default Layout;
