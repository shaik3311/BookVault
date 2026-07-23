import React, { useState } from "react";
import {
  BookOpen,
  Bookmark,
  Home,
  User,
  ChevronDown,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Navigate,NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  // Replace these with Redux data later
  const [loggedUser] = useState("Shaik3311");
  const [role] = useState("Reader");

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200 bg-indigo-300">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="bg-indigo-600 p-2 rounded-xl">
            <BookOpen className="text-white" size={22} />
          </div>

          <h1 onClick={Navigate('/')} className="text-2xl font-bold text-gray-800">
            Book<span className="text-indigo-600">Vault</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg transition font-medium ${
                  isActive
                    ? "bg-indigo-600 text-white shadow"
                    : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                }`
              }
            >
            <Home size={20} />
            Home
          </NavLink>

          <NavLink
              to="/books"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg transition font-medium ${
                  isActive
                    ? "bg-indigo-600 text-white shadow"
                    : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                }`
              }
        >
              <BookOpen size={20} />
              Books
        </NavLink>

          <NavLink
            to="/bookmarks"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg transition font-medium ${
                isActive
                  ? "bg-indigo-600 text-white shadow"
                  : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
              }`
            }
          >
            <Bookmark size={20} />
            Bookmarks
          </NavLink>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-gray-100 transition"
            >
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                <User size={20} />
              </div>

              <div className="text-left">
                <p className="font-semibold text-gray-800">{loggedUser}</p>
                <p className="text-xs text-gray-500">{role}</p>
              </div>

              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden animate-fadeIn">
                <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition">
                  <User size={18} />
                  View Profile
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition">
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
        >
          {mobileMenu ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileMenu ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="border-t bg-white shadow-lg">
          <NavLink
            to="/"
            onClick={() => setMobileMenu(false)}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-6 py-4 transition ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 hover:bg-gray-50"
              }`
            }
          >
            <Home size={20} />
            Home
          </NavLink>

          <NavLink
            to="/books"
            onClick={() => setMobileMenu(false)}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-6 py-4 transition ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 hover:bg-gray-50"
              }`
            }
          >
            <Home size={20} />
            Books
          </NavLink>

          <NavLink
            to="/bookmarks"
            onClick={() => setMobileMenu(false)}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-6 py-4 transition ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 hover:bg-gray-50"
              }`
            }
          >
            <Home size={20} />
            BookMarks
          </NavLink>

          <div className="border-t my-2"></div>

          <div className="px-6 py-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                <User size={20} />
              </div>

              <div>
                <p className="font-semibold text-gray-800">{loggedUser}</p>
                <p className="text-sm text-gray-500">{role}</p>
              </div>
            </div>
          </div>

          <button className="w-full flex items-center gap-3 px-6 py-4 hover:bg-gray-50 transition">
            <User size={20} />
            View Profile
          </button>

          <button className="w-full flex items-center gap-3 px-6 py-4 text-red-600 hover:bg-red-50 transition">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;