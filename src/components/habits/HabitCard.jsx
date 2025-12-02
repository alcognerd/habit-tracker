import React from "react";
import { categoryIcons, categoryColors } from "../../utils/categoryIcons";
import axios from "axios";
import backendUrl from "../../api/Constanceapi";
import { HiOutlineTrash } from "react-icons/hi";

export default function HabitCard({ habit, onDelete }) {
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

  const Icon = categoryIcons[habit.category];
  const accent = getAccentClasses(categoryColors[habit.category] || "blue");

  const handleDelete = async () => {
    try {
      await axios.delete(`${backendUrl}/api/habits/${habit.id}`, {
        withCredentials: true,
      });
      onDelete?.(habit.id); // notify parent
    } catch (err) {
      console.error("Error deleting habit:", err);
    }
  };

  return (
    <div
      className={`
        bg-[#111111]/80 
        backdrop-blur-xl
        rounded-3xl 
        border border-gray-800/60 
        shadow-[0px_0px_25px_-4px_rgba(0,0,0,0.6)]
        transition-all duration-300 
        p-5
        flex items-center justify-between
        hover:-translate-y-1
      `}>
      {/* Left: Icon + Name */}
      <div className="flex items-center gap-4">
        <div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${accent}
            border flex items-center justify-center shadow-lg`}>
          <Icon className="w-7 h-7" />
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-100">{habit.name}</h3>
          <p className="text-sm text-gray-500">{habit.frequency}</p>
        </div>
      </div>

      {/* Right: Regular Delete Button */}
      <button
        onClick={handleDelete}
        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-red-600 
             hover:bg-red-700 text-white rounded-lg transition-colors 
             cursor-pointer text-sm">
        <HiOutlineTrash className="w-4 h-4" />
        Delete
      </button>
    </div>
  );
}
