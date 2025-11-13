import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from "../firebase/firebase.init";
import { toast, ToastContainer } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { setUser } = useContext(AuthContext);

  const googleProvider = new GoogleAuthProvider();
  const handleGoogleSubmit = () => {
    signInWithPopup(auth, googleProvider)
      .then((data) => {
        setUser(data.user);
        navigate(from, { replace: true });
      })
      .catch((e) => {
        toast.error(e.code);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const [shwPassword, setShowPassword] = useState(false);

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        <div className="card bg-white/30 backdrop-blur-md w-full max-w-sm shrink-0 shadow-2xl rounded-2xl">
          <form onSubmit={handleFormSubmit} className="card-body">
            <fieldset className="fieldset">
              <label className="label text-orange-600 font-semibold">
                Email
              </label>
              <input
                name="email"
                type="email"
                className="input bg-white/50 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-orange-400 rounded-xl"
                placeholder="Email"
                required
              />

              <div className="relative mt-4">
                <label className="label text-orange-600 font-semibold">
                  Password
                </label>
                <input
                  name="password"
                  type={shwPassword ? "text" : "password"}
                  className="input bg-white/50 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-orange-400 rounded-xl"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!shwPassword)}
                  className="btn btn-sm absolute right-5 top-[37%] z-10 bg-white/50 hover:bg-orange-100"
                >
                  {shwPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button className="btn mt-6 w-full bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold py-3 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300">
                Login
              </button>

              <p className="text-center text-xl leading-[0.8] my-4">
                --- or ---
              </p>

              <button
                type="button"
                onClick={handleGoogleSubmit}
                className="btn w-full bg-white/50 text-black border-[#e5e5e5] font-semibold py-3 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Continue with Google
              </button>

              <p className="flex gap-3 text-[16px] mt-4 justify-center">
                Don't have an account?{" "}
                <Link
                  to={"/register"}
                  className="hover:underline text-orange-600 font-medium"
                >
                  Register
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
