import React from "react";
import { HiCheckCircle } from "react-icons/hi";

export default function HabitTodayCard({ habit }) {
  const Icon = habit.icon;

  return (
    <div
      className="bg-[#121212]/80 backdrop-blur-xl rounded-2xl border border-gray-800/60 
      p-5 flex items-center justify-between shadow-lg 
      hover:shadow-purple-900/20 transition-all duration-300">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-xl border flex items-center justify-center ${
            habit.completed
              ? "bg-green-500/20 border-green-500/40 text-green-400"
              : "bg-gray-800/60 border-gray-700 text-gray-500"
          }`}>
          <Icon className="w-6 h-6" />
        </div>

        <span
          className={`font-medium text-lg ${
            habit.completed ? "text-gray-100" : "text-gray-500"
          }`}>
          {habit.name}
        </span>
      </div>

      {/* RIGHT */}
      {habit.completed ? (
        <HiCheckCircle className="w-8 h-8 text-green-400" />
      ) : (
        <button
          className="px-4 py-2 rounded-xl bg-purple-600/20 border border-purple-500/40 
          text-purple-300 hover:bg-purple-600/30 active:scale-95 transition-all">
          Mark Completed
        </button>
      )}
    </div>
  );
}
