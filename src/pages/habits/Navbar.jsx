import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Profile from "../../components/common/Profile";
import NotificationModal from "../../components/common/NotificationModal";
import logo from "../../assets/newLogo.png";

// -------------------------------------------------------
// Hamburger Icon
// -------------------------------------------------------
const HamburgerIcon = ({ isOpen }) => (
  <div className="w-8 h-8 flex flex-col justify-center items-center gap-1.5">
    <motion.span
      animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
      className="w-7 h-0.5 bg-white block origin-center"
    />
    <motion.span
      animate={{ opacity: isOpen ? 0 : 1 }}
      className="w-7 h-0.5 bg-white block"
    />
    <motion.span
      animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
      className="w-7 h-0.5 bg-white block origin-center"
    />
  </div>
);

// -------------------------------------------------------
// Close Icon
// -------------------------------------------------------
const CloseIcon = () => (
  <svg
    className="w-7 h-7"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2">
    <path d="M18 6L6 18" />
    <path d="M6 6l12 12" />
  </svg>
);

// -------------------------------------------------------
// MAIN NAVBAR
// -------------------------------------------------------
export default function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* TOP NAVBAR */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-40
          flex justify-between items-center px-5 py-4
          bg-[#0C0C0C]/70 backdrop-blur-2xl
          border-b border-neutral-800
          shadow-xl shadow-black/30">
        {/* LEFT: LOGO */}
        <div
          onClick={() => handleNavigate("/")}
          className="flex items-center gap-4 cursor-pointer select-none">
          <img
            src={logo}
            alt="Habit Tracker Logo"
            className="w-12 h-12 object-contain rounded-xl shadow-lg"
          />
          <h3 className="text-lg md:text-xl font-extrabold tracking-wide text-white">
            Habit Tracker
          </h3>
        </div>

        {/* RIGHT: DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center gap-5">
          <NotificationModal />

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavigate("/dashboard")}
            className="px-6 py-3
              bg-[#111]/80 border border-neutral-700/60
              rounded-xl text-white font-medium
              hover:bg-[#191919] transition-all
              shadow-lg">
            Dashboard
          </motion.button>

          <Profile />
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden z-50"
          aria-label="Open menu">
          <HamburgerIcon isOpen={isMobileMenuOpen} />
        </button>
      </motion.div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
            />

            {/* DRAWER */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 280 }}
              className="fixed right-0 top-0 h-full w-80 max-w-[90vw]
    bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a]
    backdrop-blur-2xl border-l border-neutral-800
    shadow-2xl z-50 md:hidden flex flex-col">
              {/* HEADER */}
              <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-11 h-11 rounded-xl shadow-lg"
                  />
                  <div>
                    <h2 className="text-lg font-bold text-white leading-tight">
                      Habit Tracker
                    </h2>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.9, rotate: 90 }}
                  onClick={closeMenu}
                  className="text-neutral-400 hover:text-white transition-colors p-2"
                  aria-label="Close menu">
                  <CloseIcon />
                </motion.button>
              </div>

              {/* PROFILE CARD */}
              <div className="p-6 border-b border-neutral-800">
                <div
                  className="flex items-center gap-4
      bg-[#111]/80 border border-neutral-700/60
      rounded-2xl p-4 shadow-lg">
                  <Profile />
                  <div className="text-sm">
                    <p className="text-white font-semibold">Welcome back 👋</p>
                    <p className="text-neutral-400 text-xs">
                      Stay consistent today
                    </p>
                  </div>
                </div>
              </div>

              {/* NAV LINKS */}
              <div className="p-6 flex flex-col gap-3">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleNavigate("/dashboard")}
                  className="w-full flex items-center gap-3 py-4 px-5
        text-white font-medium rounded-xl
        bg-[#111]/80 border border-neutral-700/60
        shadow-md hover:bg-[#1a1a1a] transition-all">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  Dashboard
                </motion.button>
              </div>

              {/* FOOTER */}
              <div className="mt-auto p-6 border-t border-neutral-800">
                <p className="text-neutral-500 text-xs text-center">
                  © 2025 Habit Tracker
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
