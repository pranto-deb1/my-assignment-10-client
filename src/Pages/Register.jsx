import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { auth } from "../firebase/firebase.init";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/";

  const { setUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const name = e.target.fullName.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const conformPassword = e.target.conformPassword.value;
    const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordValidation.test(password)) {
      toast.error(
        "Password must be more than 6 charecters and include both uppercase & lowercase"
      );
      return;
    }

    if (password !== conformPassword) {
      toast.error("Password did not match");
      return;
    }

    setError("");

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            const updatedUser = {
              ...auth.currentUser,
              displayName: name,
              photoURL: photo,
            };

            setUser(updatedUser);
            navigate("/");
            window.location.reload();
          })
          .catch((e) => {
            toast.error(e.code);
          });
      })
      .catch((e) => {
        toast.error(e.code);
      });
  };
  const googleProvider = new GoogleAuthProvider();
  const handleGoogleSubmit = () => {
    signInWithPopup(auth, googleProvider)
      .then((data) => {
        setUser(data.user);
        navigate("/");
        window.location.reload();
      })
      .catch((e) => {
        toast.error(e.code);
      });
  };

  const [shwPassword, setShowPassword] = useState(false);
  const [shw2Password, setShow2Password] = useState(false);

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-orange-600">Register Now</h1>
        </div>
        <div className="card bg-white/30 backdrop-blur-md w-full max-w-sm shrink-0 shadow-2xl rounded-2xl">
          <form onSubmit={handleFormSubmit} className="card-body">
            <fieldset className="fieldset">
              <h2 className="text-2xl font-bold text-center text-orange-600 mb-4">
                Create An Account
              </h2>

              <label className="label text-orange-600 font-semibold">
                Full Name
              </label>
              <input
                name="fullName"
                type="text"
                className="input bg-white/50 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-orange-400 rounded-xl"
                placeholder="Full Name"
                required
              />

              <label className="label text-orange-600 font-semibold mt-4">
                Photo URL
              </label>
              <input
                name="photo"
                type="text"
                className="input bg-white/50 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-orange-400 rounded-xl"
                placeholder="URL"
              />

              <label className="label text-orange-600 font-semibold mt-4">
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
                  className="btn btn-sm absolute text-black right-5 top-[37%] z-10 bg-white/50 hover:bg-orange-100"
                >
                  {shwPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="relative mt-4">
                <label className="label text-orange-600 font-semibold">
                  Confirm Password
                </label>
                <input
                  name="conformPassword"
                  type={shw2Password ? "text" : "password"}
                  className="input bg-white/50 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-orange-400 rounded-xl"
                  placeholder="Confirm Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShow2Password(!shw2Password)}
                  className="btn btn-sm absolute text-black right-5 top-[37%] z-10 bg-white/50 hover:bg-orange-100"
                >
                  {shw2Password ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button className="btn mt-6 w-full bg-linear-to-r from-orange-400 to-red-500 text-white font-semibold py-3 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300">
                Sign Up
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
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="hover:underline text-orange-600 font-medium"
                >
                  Login
                </Link>
              </p>

              {error && (
                <p className="font-semibold text-[16px] text-red-500 mt-2">
                  {error}
                </p>
              )}
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
