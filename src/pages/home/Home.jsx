import React, { useState } from "react";
import Navbar from "../habits/Navbar";
import TodayHabits from "../habits/TodayHabits";
import Suggestion from "../../components/layout/Suggestion";

const Home = () => {
  const [activeTab, setActiveTab] = useState("today"); // today | suggestion

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* FIXED NAVBAR */}
      <div className="fixed top-0 left-0 w-full z-50 bg-black border-b border-neutral-900">
        <Navbar />
      </div>

      {/* MAIN CONTENT */}
      <div className="pt-20 flex flex-col md:flex-row flex-1">
        {/* MOBILE TABS */}
        <div className="md:hidden flex gap-3 px-5 pt-4 pb-4 bg-black">
          <button
            onClick={() => setActiveTab("today")}
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 shadow-lg
              ${
                activeTab === "today"
                  ? "bg-blue-600 text-white shadow-blue-600/30"
                  : "bg-neutral-900 text-neutral-500 hover:bg-neutral-800"
              }`}>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            Today Habits
          </button>

          <button
            onClick={() => setActiveTab("suggestion")}
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 shadow-lg
              ${
                activeTab === "suggestion"
                  ? "bg-purple-600 text-white shadow-purple-600/30"
                  : "bg-neutral-900 text-neutral-500 hover:bg-neutral-800"
              }`}>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Suggestions
          </button>
        </div>
        {/* TODAY HABITS */}
        <div
          className={`flex-2/3 overflow-y-auto transition-opacity duration-500 h-[calc(100vh-80px)] ${
            activeTab === "today" ? "opacity-100" : "opacity-0 md:opacity-100"
          } ${activeTab !== "today" ? "hidden md:flex" : "flex"} flex-col`}>
          <TodayHabits />
        </div>

        {/* SUGGESTION */}
        <div
          className={`flex-1/3 h-[calc(100vh-80px)] transition-opacity duration-500 ${
            activeTab === "suggestion"
              ? "opacity-100"
              : "opacity-0 md:opacity-100"
          } ${
            activeTab !== "suggestion" ? "hidden md:flex" : "flex"
          } flex-col`}>
          <Suggestion />
        </div>
      </div>
    </div>
  );
};

export default Home;
