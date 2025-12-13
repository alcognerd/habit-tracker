import React, { useEffect, useState } from "react";
import { HiCheckCircle } from "react-icons/hi";
import { AiOutlineCloseCircle, AiTwotoneCheckCircle } from "react-icons/ai";
import { categoryIcons } from "../../utils/categoryIcons";
import { updateHabitStatus } from "../../api/habit";

export default function HabitTodayCard({ habit, onStatusChange }) {
  const Icon = categoryIcons[habit.category];
  const [status, setStatus] = useState(habit.habitStatus);

  useEffect(() => {
    setStatus(habit.habitStatus);
  }, [habit.habitStatus]);

  const handleUpdateStatus = async (newStatus) => {
    setStatus(newStatus);

    try {
      await updateHabitStatus(habit.id, newStatus);
      onStatusChange(habit.id, newStatus);
    } catch (error) {
      console.error("Error updating habit:", error);
      setStatus(habit.habitStatus);
    }
  };

  return (
    <div
      className="bg-[#121212]/80 backdrop-blur-xl rounded-2xl border border-gray-800/60 
      p-4 md:p-5 shadow-lg hover:shadow-purple-900/20 transition-all duration-300">
      <div className="flex flex-row md:items-center justify-between gap-4">
        {/* LEFT AREA */}
        <div className="flex items-center gap-4">
          <div
            className={`w-10 h-10 md:w-12 md:h-12 rounded-xl border flex items-center justify-center ${
              status === "COMPLETED"
                ? "bg-green-500/20 border-green-500/40 text-green-400"
                : status === "SKIPPED"
                ? "bg-red-500/20 border-red-500/40 text-red-400"
                : "bg-gray-800/60 border-gray-700 text-gray-300"
            }`}>
            <Icon className="w-5 h-5 md:w-6 md:h-6" />
          </div>

          <span
            className={`font-medium text-base md:text-lg lg:text-xl ${
              status === "COMPLETED"
                ? "text-green-400"
                : status === "SKIPPED"
                ? "text-red-400"
                : "text-gray-100"
            }`}>
            {habit.name}
          </span>
        </div>

        {/* RIGHT AREA */}
        <div className="flex flex-col md:flex-row gap-2">
          {status === "COMPLETED" ? (
            <HiCheckCircle className="w-7 h-7 md:w-8 md:h-8 text-green-400" />
          ) : status === "SKIPPED" ? (
            <span className="text-sm md:text-base text-red-400 font-medium">
              Skipped
            </span>
          ) : (
            <>
              <button
                onClick={() => handleUpdateStatus("COMPLETED")}
                className="py-2 px-5 rounded-xl bg-purple-600/20 border border-purple-500/40 
                text-purple-300 hover:bg-purple-600/30 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                title="completed">
                <AiTwotoneCheckCircle className="text-xl" />
              </button>

              <button
                onClick={() => handleUpdateStatus("SKIPPED")}
                className="py-2 px-5  rounded-xl bg-red-600/20 border border-red-500/40 
                text-red-300 hover:bg-red-600/30 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                title="skip">
                <AiOutlineCloseCircle className="text-xl" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
