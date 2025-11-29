import React from "react";
import logo from "../../assets/newLogo.png";
import { FcGoogle } from "react-icons/fc";
import googleLogin from "../../api/loginApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    googleLogin();
  };
  return (
    <div className="min-h-screen bg-background gradient-bg flex items-center justify-center px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-neutral-950 rounded-3xl border border-neutral-900 shadow-2xl overflow-hidden">
        {/* Logo & Title */}
        <div className="pt-16 pb-12 px-10 flex flex-col items-center text-center gap-6">
          <img
            src={logo}
            alt="HabitFlow Logo"
            className="w-20 h-20 object-contain"
          />

          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight">
              HabitTracker
            </h1>
            <p className="text-neutral-400 text-lg mt-2">
              Build better habits, one day at a time.
            </p>
          </div>
        </div>

        {/* Google Login Button */}
        <div className="px-7 pb-8">
          <button
            onClick={handleLogin}
            className="w-full bg-white text-black rounded-xl py-4 font-medium text-lg flex items-center justify-center gap-3 cursor-pointer
           hover:bg-gray-100 active:scale-95 transition-all duration-200 shadow-sm">
            <FcGoogle size={24} />
            Continue with Google
          </button>
        </div>
        <div className="bg-neutral-900/80 px-10 h-15 py-5 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
