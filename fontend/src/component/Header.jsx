import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useUserStore } from "./stores/useUserStore";
import logo from "../assets/logo.png";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleUserProfileOpen = () => setUserProfileOpen(!userProfileOpen);

  const { user, logout } = useUserStore();

  const isAdmin = user?.role === "admin";
  console.log("first", isAdmin);
  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="md:flex md:items-center md:gap-12">
            <Link to={"/"} className="block text-teal-600">
              <span className="sr-only">Home</span>
              <img src={logo} alt="" className="h-12" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden bg-gray-100 p-2 md:flex items-center justify-center space-x-2 rounded-md">
            {/* Navigation Links */}
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                {["Contact us", "Careers"].map((item) => (
                  <li key={item}>
                    <a className="text-gray-600 hover:text-gray-700" href="#">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            {/*  */}

            {isAdmin && (
              <div className="hidden sm:flex sm:gap-4">
                <Link
                  className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 hover:bg-gray-200"
                  to={"/admin"}
                >
                  Admin dashboard
                </Link>
              </div>
            )}
            {/* Login Button */}
            <div className="hidden sm:flex sm:gap-4">
              {!user && (
                <Link
                  className="rounded-md px-5 py-2.5 text-sm font-medium bg-teal-600 text-white hover:bg-teal-700"
                  to={"/login"}
                >
                  Login
                </Link>
              )}

              {user && (
                <div className="relative">
                  <div onClick={handleUserProfileOpen}>
                    <img
                      src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                      alt=""
                      className="size-10 rounded-full cursor-pointer"
                    />
                  </div>
                  {userProfileOpen && (
                    <div className="relative">
                      <ul className="bg-white flex flex-col items-start px-2 py-1 top-4 right-0 mt-6 space-y-6 lg:absolute lg:border lg:rounded-md lg:w-40 lg:shadow-md lg:space-y-0 lg:mt-0">
                        <button
                          className="hover:bg-gray-400 w-full
                        "
                        >
                          <Link to={"/profile"}>Profile</Link>
                        </button>
                        <button
                          onClick={logout}
                          className="hover:bg-gray-400 w-full
                        "
                        >
                          Logout
                        </button>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="block md:hidden">
              <button
                onClick={toggleMenu}
                className="rounded bg-gray-100 p-2 text-gray-600 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu (Absolute Position) */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-30">
            <nav aria-label="Global">
              <ul className="space-y-4 p-4 text-sm">
                {["Contact us", "Careers"].map((item) => (
                  <li key={item}>
                    <a
                      className="text-gray-500 hover:text-gray-700 block"
                      href="#"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex sm:hidden sm:gap-4">
              <a
                className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 hover:bg-gray-200"
                href="#"
              >
                Login
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
