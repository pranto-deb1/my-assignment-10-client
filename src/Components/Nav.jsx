import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import { toast, ToastContainer } from "react-toastify";

const Nav = () => {
  const { user } = useContext(AuthContext);

  console.log(user);
  const [dropdown, setDropdown] = useState(false);
  //   const handleToggleDropdown = () => {};

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeChange = (chaked) => {
    setTheme(chaked ? "dark" : "light");
  };
  const links = (
    <>
      <NavLink to={"/"} className={"mx-2.5"}>
        Home
      </NavLink>
      <NavLink to={"/About"} className={"mx-2.5"}>
        About
      </NavLink>
      <NavLink to={"/All-food"} className={"mx-2.5"}>
        All Food
      </NavLink>
    </>
  );

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        setTimeout(() => toast.success("User logged out successfully"), 100);
        setDropdown(false);
      })
      .catch((err) => {
        toast.error(err.code);
      });
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className=" text-xl text-center bg-gray-200 px-4 py-2 rounded-2xl ">
          <span className="text-amber-600 font-black">Local Food Lovers</span>
          <br /> <span className="text-green-400 font-bold">Network</span>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end relative">
        {user ? (
          <div className="flex gap-2 items-center">
            <img
              src={user.photoURL}
              className="w-14 h-14 rounded-full"
              onClick={() => setDropdown(!dropdown)}
            />
            <p onClick={() => setDropdown(!dropdown)} className="">
              {user.displayName}
            </p>
          </div>
        ) : (
          <Link to={"/login"} className="btn">
            Login
          </Link>
        )}
        <div
          className={`${
            dropdown
              ? " absolute overflow-scroll w-2xs h-[250px] border top-[70px] bg-base-100 p-4 rounded-[10px] transition-dropdown"
              : "hidden"
          }`}
        >
          <p className="font-bold text-xl mb-2.5">You</p>
          <div className="flex flex-col mb-6 gap-4 ">
            <Link className="btn ">Add Review</Link>
            <Link className="btn">My Reviews</Link>
            <button onClick={handleLogOut} className="btn">
              Logout
            </button>
          </div>

          <p className="font-bold text-xl mb-2.5">Theme</p>
          <div className="flex gap-2.5">
            <p className="">Light Mode</p>
            <input
              onChange={(e) => handleThemeChange(e.target.checked)}
              type="checkbox"
              className="toggle"
              defaultChecked={theme === "dark"}
            />
            <p className="">Dark Mode</p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Nav;
