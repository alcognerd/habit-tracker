import React from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../../components/common/Profile";
import logo from "../../assets/newLogo.png";
import { motion } from "framer-motion";

export default function Navbar({ todayStats }) {
  const navigate = useNavigate();

  const handleNavigate = () => navigate("/dashboard");
  const handleNavigateHome = () => navigate("/");

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-between items-center px-5 py-4
      bg-[#0C0C0C]/70 backdrop-blur-2xl border-b border-neutral-800
      shadow-xl shadow-black/30  top-0 z-50">
      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleNavigateHome}
          className="cursor-pointer">
          <img
            src={logo}
            alt="Habit Tracker Logo"
            className="w-12 h-12 object-contain rounded-xl shadow-lg"
          />
        </button>

        <div>
          <h3 className="text-md md:text-xl font-extrabold tracking-wide text-white leading-none">
            Habit Tracker
          </h3>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-5">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleNavigate}
          className="px-5 py-2.5 
      bg-[#111]/80 
      border border-neutral-700/60 
      rounded-xl text-sm font-medium text-white 
      hover:bg-[#191919] hover:border-neutral-600
      transition-all duration-200 shadow-lg shadow-black/20
      backdrop-blur-xl cursor-pointer z-50">
          Dashboard
        </motion.button>

        <Profile />
      </div>
    </motion.div>
  );
}
