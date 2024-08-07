import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { useAuthContext } from "../context/AuthContext";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import { LuSparkles } from "react-icons/lu";

const Navbar = () => {
  const { authUser } = useAuthContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full bg-glass border-b sticky top-0 z-50 backdrop-blur-md">
      <nav className="container mx-auto flex items-center justify-between py-2 px-4">
        <div className="flex items-center">
        <div className="text-4xl text-white-500 p-4">
          <LuSparkles />
        </div>
          <h1 className="text-lg font-bold">Event Horizon</h1>
        </div>
        <div className="hidden md:flex gap-2 items-center">
          {!authUser && (
            <Link
              to="/"
              className="px-2 py-1 transition-colors duration-200 rounded-lg hover:bg-gray-800 h-10 flex items-center"
            >
              Home
            </Link>
          )}
          {authUser && (
            <>
              <Link
                to="/events"
                className="px-2 py-1 transition-colors duration-200 rounded-lg hover:bg-gray-800 h-10 flex items-center"
              >
                Events
              </Link>
              <Link
                to="/dashboard"
                className="px-2 py-1 transition-colors duration-200 rounded-lg hover:bg-gray-800 h-10 flex items-center"
              >
                Dashboard
              </Link>
            </>
          )}
          {!authUser && (
            <>
              <Link
                to="/login"
                className="px-2 py-1 transition-colors duration-200 rounded-lg hover:bg-gray-800 h-10 flex items-center"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-2 py-1 transition-colors duration-200 rounded-lg hover:bg-gray-800 h-10 flex items-center"
              >
                Signup
              </Link>
            </>
          )}
          {authUser && <Logout />}
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-700 focus:outline-none"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-glass backdrop-blur-md border-t w-screen">
          <nav className="flex flex-col items-center py-2">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-left px-2 py-2 transition-colors duration-200 hover:bg-gray-800"
            >
              Home
            </Link>
            {authUser && (
              <>
                <Link
                  to="/events"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-left px-2 py-2 transition-colors duration-200 hover:bg-gray-800"
                >
                  Events
                </Link>
                <Link
                  to="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-left px-2 py-2 transition-colors duration-200 hover:bg-gray-800"
                >
                  Dashboard
                </Link>
              </>
            )}
            {!authUser && (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-left px-2 py-2 transition-colors duration-200 hover:bg-gray-800"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-left px-2 py-2 transition-colors duration-200 hover:bg-gray-800"
                >
                  Signup
                </Link>
              </>
            )}
            {authUser && (
              <div className="w-full text-left px-2 py-2 transition-colors duration-200 hover:bg-gray-800">
                <Logout />
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
