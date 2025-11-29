import React from "react";
import { BsFillDropletFill } from "react-icons/bs";
import { FaDumbbell } from "react-icons/fa";
import { FiBookOpen, FiCoffee } from "react-icons/fi";
import { HiUser } from "react-icons/hi";
import HabitTodayCard from "../../components/habits/HabitTodayCard";

export default function Dashboard() {
  const todayStats = {
    completed: 5,
    pending: 3,
  };

  const todaysHabits = [
    {
      id: 1,
      name: "Drink Water",
      icon: BsFillDropletFill,
      frequency: "Daily",
      color: "blue",
      completed: true,
    },
    {
      id: 2,
      name: "Morning Workout",
      icon: FaDumbbell,
      frequency: "Daily",
      color: "purple",
      completed: false,
    },
    {
      id: 3,
      name: "Read 30 mins",
      icon: FiBookOpen,
      frequency: "Daily",
      color: "indigo",
      completed: true,
    },
    {
      id: 4,
      name: "Meditate",
      icon: FiCoffee,
      frequency: "Weekdays",
      color: "violet",
      completed: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-gray-100 pb-24 px-4 sm:px-6 lg:px-12">
      {/* HEADER */}
      <div className="pt-12 pb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-100">
            Good Evening,
          </h1>
          <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mt-1">
            Alex
          </p>
        </div>

        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center shadow-xl shadow-purple-800/40">
          <HiUser className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
      </div>

      {/* TODAY'S SUMMARY */}
      <div className="mb-8">
        <div className="bg-[#121212]/80 backdrop-blur-xl rounded-3xl border border-gray-800/60 p-4 sm:p-6 shadow-2xl">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-300 mb-4 sm:mb-6">
            Today's Summary
          </h2>

          <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 text-center">
            {/* Completed */}
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-400">
                {todayStats.completed}
              </div>
              <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-1">
                Completed
              </p>
            </div>

            {/* Pending */}
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-400">
                {todayStats.pending}
              </div>
              <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-1">
                Pending
              </p>
            </div>

            {/* Daily Goal Progress */}
            <div className="col-span-3 sm:col-span-3 md:col-span-3">
              <div className="flex justify-between text-xs sm:text-sm md:text-base text-gray-400 mb-1">
                <span>Daily Goal</span>
                <span>
                  {todayStats.completed}/
                  {todayStats.completed + todayStats.pending}
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2 sm:h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-700"
                  style={{
                    width: `${
                      (todayStats.completed /
                        (todayStats.completed + todayStats.pending)) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TODAY'S HABITS */}
      <div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-300 mb-4">
          Today's Habits
        </h3>

        <div className="space-y-3">
          {todaysHabits.map((habit, i) => (
            <HabitTodayCard
              key={i}
              habit={habit}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
