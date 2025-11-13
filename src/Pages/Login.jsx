import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from "../firebase/firebase.init";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router";

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

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleFormSubmit} className="card-body">
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                className="input"
                placeholder="Email"
              />
              <label className="label">Password</label>
              <input
                name="password"
                type="password"
                className="input"
                placeholder="Password"
              />
              <div>
                {/* <a className="link link-hover">Forgot password?</a> */}
              </div>
              <button className="btn btn-neutral mt-4">Login</button>
              <p className="text-center text-xl leading-[0.8]">--- or ---</p>
              <button
                className="btn bg-white text-black border-[#e5e5e5]"
                onClick={handleGoogleSubmit}
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
                Login with Google
              </button>
            </fieldset>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
