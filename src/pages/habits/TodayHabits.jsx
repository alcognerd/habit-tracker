import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

import backendUrl from "../../api/Constanceapi";
import HabitTodayCard from "../../components/habits/HabitTodayCard";
import Navbar from "./Navbar";
import Spinner from "../../components/common/Spinner"; // ✅ ADDED

export default function TodayHabits() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [todaysHabits, setTodaysHabits] = useState([]);
  const [todayStats, setTodayStats] = useState({ completed: 0, pending: 0 });

  const navigate = useNavigate();

  const fetchTodayHabits = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/habits/today`, {
        withCredentials: true,
      });

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

  const handleDelete = (id) => {
    setTodaysHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

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
    fetchTodayHabits();
  }, []);

  // ✅ LOADING UI WITH SPINNER
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner height="70px" />
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1b1b1b] text-white px-6 py-6 pb-28">
      {todaysHabits.length === 0 ? (
        <div className="flex flex-col items-center justify-center pt-20 text-neutral-400">
          <p className="text-lg">No habits found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
        </div>
      )}

      {/* ➕ Floating Add Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate("/add-habit")}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-500 cursor-pointer text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all">
        <span className="text-4xl font-bold">+</span>
      </motion.button>
    </motion.div>
  );
}
