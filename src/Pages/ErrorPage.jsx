import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-[#0d0d0d] flex flex-col justify-center items-center text-white px-5">
      <img
        src="https://cdn-icons-png.flaticon.com/512/7486/7486802.png"
        alt="funny error"
        className="w-60 mb-6 animate-bounce"
      />

      <h1 className="text-7xl font-bold mb-3">404</h1>
      <p className="text-2xl mb-8 text-center">Oops! Page Not Found 😅</p>

      <Link
        to="/"
        className="px-8 py-3 bg-linear-to-r from-orange-400 to-pink-500 rounded-xl text-xl font-semibold shadow-lg hover:scale-105 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
