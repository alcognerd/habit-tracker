import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import HabitTodayCard from "../../components/habits/HabitTodayCard";
import Spinner from "../../components/common/Spinner";

// Service functions
import { getTodayHabits } from "../../api/habit";

export default function TodayHabits() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [todaysHabits, setTodaysHabits] = useState([]);
  const [todayStats, setTodayStats] = useState({ completed: 0, pending: 0 });

  const navigate = useNavigate();

  // FETCH TODAY'S HABITS
  const fetchTodayHabitsData = async () => {
    try {
      const res = await getTodayHabits();
      const habits = res.data.data || [];

      setTodaysHabits(habits);

      const completed = habits.filter(
        (h) => h.habitStatus === "COMPLETED"
      ).length;

      const pending = habits.length - completed;

      setTodayStats({ completed, pending });
    } catch (err) {
      console.error("Failed to fetch today's habits:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // DELETE FROM UI ONLY
  const handleDelete = (id) => {
    setTodaysHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  // STATUS UPDATE (UI ONLY)
  const handleStatusChange = (habitId, status) => {
    setTodaysHabits((prev) =>
      prev.map((habit) =>
        habit.id === habitId ? { ...habit, habitStatus: status } : habit
      )
    );

    const completed = todaysHabits.filter((h) =>
      h.id === habitId ? status === "COMPLETED" : h.habitStatus === "COMPLETED"
    ).length;

    const pending = todaysHabits.length - completed;
    setTodayStats({ completed, pending });
  };

  useEffect(() => {
    fetchTodayHabitsData();
  }, []);

  // LOADING UI
  if (loading)
    return (
      <div className="h-full flex justify-center items-center pt-10">
        <Spinner height="60px" />
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full bg-gradient-to-b from-[#0f0f0f] to-[#1b1b1b] 
      text-white p-4 overflow-y-scroll relative">
      {todaysHabits.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-neutral-400">
          <p className="text-lg">No habits found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {todaysHabits.map((habit) => (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}>
              <HabitTodayCard
                habit={habit}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            </motion.div>
          ))}

          <motion.button
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.08 }}
            onClick={() => navigate("/add-habit")}
            className="fixed md:sticky bottom-4 right-5 md:left-full
             h-14 w-14 rounded-xl bg-blue-600 text-white text-3xl font-bold
             flex items-center justify-center
             text-center cursor-pointer
             shadow-lg shadow-blue-500/30
             hover:bg-blue-700 transition-all">
            +
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}
