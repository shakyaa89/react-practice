import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

interface User {
  username: string;
  email: string;
}

const NavBar = () => {
  const navigate = useNavigate();

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedInUser(null);
    navigate("/");
  };

  return (
    <header className="mt-5 inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
      <div className="px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex shrink-0">
            <Link to="/" aria-current="page" className="flex items-center">
              <h1 className="font-bold">STP</h1>
              <p className="sr-only">Website Title</p>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
            <NavLink
              to="/"
              className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
            >
              Home
            </NavLink>
            <NavLink
              to="/aboutus"
              className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
            >
              About Us
            </NavLink>
          </div>

          {/* Auth Buttons */}
          {loggedInUser ? (
            <div className="flex items-center justify-end gap-3">
              <NavLink
                to="/"
                className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
              >
                {loggedInUser.username}
              </NavLink>
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-end gap-3">
              <NavLink
                to="/register"
                className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
