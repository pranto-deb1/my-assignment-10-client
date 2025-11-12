import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";

const Nav = () => {
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
        <a className="btn" onClick={() => setDropdown(!dropdown)}>
          Button
        </a>
        <div
          className={`${
            dropdown
              ? " absolute  w-2xs h-32 border top-[70px] transition-dropdown"
              : "hidden"
          }`}
        >
          <input
            onChange={(e) => handleThemeChange(e.target.checked)}
            type="checkbox"
            className="toggle"
            defaultChecked={theme === "dark"}
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;
