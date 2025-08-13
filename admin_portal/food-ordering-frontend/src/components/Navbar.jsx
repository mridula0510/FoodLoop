import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";

const Navbar = () => {
  const [theme, setTheme] = useState("light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-wide bg-gradient-to-r from-rose-500 to-orange-400 bg-clip-text text-transparent">
            Food Court
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="hover:text-rose-500 transition-colors">Home</Link>
            <Link to="/outlets" className="hover:text-rose-500 transition-colors">Outlets</Link>
            <Link to="/orders" className="hover:text-rose-500 transition-colors">Orders</Link>
            <Link to="/profile" className="hover:text-rose-500 transition-colors">Profile</Link>
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:scale-110 transition-transform"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="px-4 py-4 space-y-4">
            <Link to="/" className="block hover:text-rose-500 transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/outlets" className="block hover:text-rose-500 transition-colors" onClick={() => setIsMenuOpen(false)}>Outlets</Link>
            <Link to="/orders" className="block hover:text-rose-500 transition-colors" onClick={() => setIsMenuOpen(false)}>Orders</Link>
            <Link to="/profile" className="block hover:text-rose-500 transition-colors" onClick={() => setIsMenuOpen(false)}>Profile</Link>
            <button 
              onClick={() => { toggleTheme(); setIsMenuOpen(false); }} 
              className="flex items-center gap-2 p-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:scale-105 transition-transform"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
