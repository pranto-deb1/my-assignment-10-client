import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import { toast } from "react-toastify";
import logo from "/ChatGPT_Image_Nov_15__2025__08_19_28_PM-removebg-preview.png";

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
      <NavLink to={"/all-reviews"} className={"mx-2.5"}>
        All Reviews
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
            {/* <svg
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
            </svg> */}
            <img src={logo} alt="" className="w-[55px] h-[55px]" />
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a>
          <img
            src={logo}
            alt=""
            className="w-[75px] h-[75px] hidden lg:block"
          />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end relative">
        {user ? (
          <div className="flex gap-2 items-center">
            <p
              onClick={() => setDropdown(!dropdown)}
              className="block lg:hidden text-right"
            >
              {user.displayName}
            </p>
            <img
              src={user.photoURL}
              className="w-11 h-11 lg:w-14 lg:h-14 rounded-full"
              onClick={() => setDropdown(!dropdown)}
            />
            <p
              onClick={() => setDropdown(!dropdown)}
              className="hidden lg:block"
            >
              {user.displayName}
            </p>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link to={"/login"} className="btn">
              Login
            </Link>

            <Link to={"/register"} className="btn">
              Register
            </Link>
          </div>
        )}
        <div
          className={`${
            dropdown
              ? " absolute overflow-scroll w-2xs h-[250px] border top-[70px] bg-base-100/70 p-4 rounded-[10px] transition-dropdown"
              : "hidden"
          }`}
        >
          <p className="font-bold text-xl mb-2.5">You</p>
          <div className="flex flex-col mb-6 gap-4 ">
            <Link className="btn bg-amber-500/80">Add Review</Link>
            <Link className="btn bg-amber-500/80">My Reviews</Link>
            <button onClick={handleLogOut} className="btn bg-amber-500/80">
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
    </div>
  );
};

export default Nav;
