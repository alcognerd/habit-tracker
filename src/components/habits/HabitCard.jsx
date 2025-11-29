import React, { useState } from "react";
import {
  HiOutlineFire,
  HiOutlineDotsVertical,
  HiOutlineTrash,
  HiOutlineX,
} from "react-icons/hi";

export default function HabitCard({ habit, onDelete }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getAccentClasses = (color) => {
    const map = {
      blue: "from-blue-500/20 to-blue-500/5 text-blue-400 border-blue-500/30 shadow-blue-600/20",
      purple:
        "from-purple-500/20 to-purple-500/5 text-purple-400 border-purple-500/30 shadow-purple-600/20",
      indigo:
        "from-indigo-500/20 to-indigo-500/5 text-indigo-400 border-indigo-500/30 shadow-indigo-600/20",
      violet:
        "from-violet-500/20 to-violet-500/5 text-violet-400 border-violet-500/30 shadow-violet-600/20",
    };
    return map[color] || map.blue;
  };

  const Icon = habit.icon;
  const accent = getAccentClasses(habit.color);

  return (
    <>
      {/* Habit Card */}
      <div
        className="
          bg-[#111111]/80 
          backdrop-blur-xl
          rounded-3xl 
          border border-gray-800/60 
          shadow-[0px_0px_25px_-4px_rgba(0,0,0,0.6)]
          hover:shadow-[0px_0px_35px_-4px_rgba(100,70,255,0.5)]
          transition-all 
          duration-300 
          hover:-translate-y-1
          p-5
        ">
        <div className="flex items-center justify-between">
          {/* Left: Icon + Name */}
          <div className="flex items-center gap-4">
            <div
              className={`
                w-16 h-16 rounded-2xl 
                bg-gradient-to-br ${accent}
                border 
                flex items-center justify-center
                shadow-lg
              `}>
              <Icon className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-100">
                {habit.name}
              </h3>
              <p className="text-sm text-gray-500">{habit.frequency}</p>
            </div>
          </div>

          {/* More Options Button */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl hover:bg-gray-900/70 transition-colors">
              <HiOutlineDotsVertical className="w-5 h-5 text-gray-400" />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div
                className="
                    absolute right-0 mt-2 w-48 
                    bg-[#161616]/95 
                    backdrop-blur-xl
                    border border-gray-800 
                    rounded-xl 
                    shadow-xl 
                    overflow-hidden 
                    z-10
                  ">
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="
                      w-full px-4 py-3 text-left text-red-400 
                      hover:bg-red-500/10 
                      flex items-center gap-3 
                      transition-colors
                    ">
                  <HiOutlineTrash className="w-5 h-5" />
                  Delete Habit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setIsDeleteModalOpen(false)}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="
                bg-[#121212] 
                border border-gray-800 
                rounded-2xl 
                shadow-2xl 
                max-w-sm w-full 
                p-6
              "
              onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-500/15 rounded-xl flex items-center justify-center">
                    <HiOutlineTrash className="w-6 h-6 text-red-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-100">
                    Delete Habit?
                  </h2>
                </div>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-800">
                  <HiOutlineX className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed">
                Are you sure you want to delete{" "}
                <span className="text-gray-200 font-medium">
                  “{habit.name}”
                </span>
                ? This action will permanently remove all progress.
              </p>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="
                    flex-1 px-5 py-3 rounded-xl 
                    border border-gray-700 
                    text-gray-300 font-medium 
                    hover:bg-gray-800/40 
                    transition
                  ">
                  Cancel
                </button>

                <button
                  onClick={() => {
                    onDelete?.(habit.id);
                    setIsDeleteModalOpen(false);
                  }}
                  className="
                    flex-1 px-5 py-3 rounded-xl 
                    bg-red-600 hover:bg-red-700 
                    text-white font-medium 
                    shadow-lg transition
                  ">
                  Delete Habit
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Click outside to close menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}
