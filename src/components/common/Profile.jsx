import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { logout } from "../../api/loginApi";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [open, setOpen] = useState(false);
  const { user, loading } = useAuth();
  const menuRef = useRef(null);

  useEffect(() => {
    if (user?.data) {
      setUserData(user.data);
    }
  }, [user]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await logout();
      if (res.status === 200) {
        localStorage.clear();
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading || !userData) return null;

  return (
    <div
      className="relative"
      ref={menuRef}>
      {/* AVATAR */}
      <motion.div
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((prev) => !prev)}
        className="w-10 h-10 rounded-full overflow-hidden
          bg-gradient-to-br from-blue-600 to-purple-600
          flex items-center justify-center
          text-white font-semibold cursor-pointer
          ring-2 ring-neutral-700 hover:ring-neutral-500
          transition">
        {userData.picture ? (
          <img
            src={userData.picture}
            alt="profile"
            className="w-full h-full object-cover"
          />
        ) : (
          userData?.name?.[0]?.toUpperCase()
        )}
      </motion.div>

      {/* DROPDOWN */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 md:-left-60 mt-3 w-56
              bg-[#0f0f0f]/95 backdrop-blur-xl
              border border-neutral-800
              rounded-2xl shadow-2xl z-50">
            {/* USER INFO */}
            <div className="p-4 border-b border-neutral-800">
              <p className="text-white font-semibold text-sm truncate">
                {userData.name}
              </p>
              <p className="text-neutral-400 text-xs truncate mt-1">
                {userData.email}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="p-2">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2
                  py-2.5 text-sm font-medium
                  text-red-400 rounded-xl
                  hover:bg-red-500/10 transition">
                Logout
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
