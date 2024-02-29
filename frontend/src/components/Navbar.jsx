import React from "react";
import { useRecoilValue } from "recoil";
import { userSelector } from "../recoil";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = useRecoilValue(userSelector);
  console.log(user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
          Taskbar Manager
        </span>
      </div>
      <div>
        {user ? (
          <div>
            <span className="text-white text-md pr-4">{user.name}</span>
            <button
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link
              to={"/signup"}
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0"
            >
              Signup
            </Link>
            <Link
              to={"/login"}
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
