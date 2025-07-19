import React from 'react'
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className=" shadow-md top-0 left-0 w-full z-50 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              NoteNest
            </Link>
          </div>

          {/* Links */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="/login"
              className="bg-blue-600 font-semibold text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 font-semibold text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Register
            </Link>
          </div>

          
        </div>
      </div>
    </nav>
  );
}

export default NavBar