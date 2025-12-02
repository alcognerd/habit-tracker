import { useEffect, useState, useRef } from "react";
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

  // Close dropdown if clicking outside
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
      await logout();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading || !userData) return <div>Loading...</div>;

  return (
    <div
      className="relative"
      ref={menuRef}>
      {/* Profile Avatar */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="w-10 h-10 bg-gray-500 text-white flex items-center justify-center rounded-full overflow-hidden cursor-pointer hover:opacity-90 transition">
        {userData?.picture ? (
          <img
            src={userData.picture}
            alt="profile"
            className="w-full h-full object-cover"
          />
        ) : (
          userData?.name?.[0]?.toUpperCase()
        )}
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-3 w-52 bg-neutral-900 border border-neutral-700 rounded-xl shadow-xl p-4 z-50 animate-fadeIn">
          <div className="flex flex-col">
            <p className="text-white font-semibold text-sm">{userData.name}</p>
            <p className="text-neutral-400 text-xs mt-1">{userData.email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="mt-4 w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition cursor-pointer">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
