import React from "react";
import Navbar from "../habits/Navbar";
import TodayHabits from "../habits/TodayHabits";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Fixed Navbar */}
      <div className="top-0 z-50">
        <Navbar />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-3 pt-4">
        <TodayHabits />
      </div>
    </div>
  );
};

export default Home;
