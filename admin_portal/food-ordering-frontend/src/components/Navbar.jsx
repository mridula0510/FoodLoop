import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  // Apply/remove class from <html> tag
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const linkClass = (path) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      location.pathname === path
        ? "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
    }`;

  return (
    <nav className="border-b border-gray-300 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-red-600 dark:text-red-400 flex items-center">
          🍽️ Food Court
        </Link>

        <button
          onClick={toggleDarkMode}
          className="text-sm border px-3 py-1 rounded-md text-gray-800 dark:text-gray-100"
        >
          {darkMode ? "🌙 Dark" : "🌞 Light"}
        </button>
      </div>

      {/* Bottom Nav */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-center space-x-4 border-t border-gray-200 dark:border-gray-700">
        <Link to="/" className={linkClass("/")}>Home</Link>
        <Link to="/collections" className={linkClass("/collections")}>Collections</Link>
        <Link to="/menu/BaskinRobin" className={linkClass("/menu/BaskinRobin")}>Menu</Link>
        <Link to="/outlet/Barista" className={linkClass("/outlet/Barista")}>Outlet</Link>
      </div>
    </nav>
  );
};

export default Navbar;
