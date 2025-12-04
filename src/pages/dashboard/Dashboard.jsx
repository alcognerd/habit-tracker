import React, { useEffect, useState } from "react";
import axios from "axios";
import backendUrl from "../../api/Constanceapi";
import HabitCard from "../../components/habits/HabitCard";
import Spinner from "../../components/common/Spinner";
import { motion } from "framer-motion";
import HeatmapSelector from "../../components/heatmap/HeatmapSelector";
import ConfirmModals from "../../components/common/ConfirmModals";

export default function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHabit, setSelectedHabit] = useState(null); // habit to delete
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/habits`, {
          withCredentials: true,
        });
        setHabits(response.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHabits();
  }, []);

  // When a card triggers delete
  const openConfirmModal = (habit) => {
    setSelectedHabit(habit);
    setShowModal(true);
  };

  // Delete habit
  const handleDelete = async () => {
    if (!selectedHabit) return;
    try {
      await axios.delete(`${backendUrl}/api/habits/${selectedHabit.id}`, {
        withCredentials: true,
      });
      setHabits((prev) =>
        prev.filter(
          (habit) =>
            habit.id !== selectedHabit.id && habit._id !== selectedHabit.id
        )
      );
      setSelectedHabit(null);
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <Spinner />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 px-4 sm:px-6 lg:px-20 py-12 pb-28">
      {/* TOP SECTION */}
      <div className="mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Habit Tracker Dashboard
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 mt-2 text-md">
          Stay consistent • Track your growth • Build your best self ✨
        </motion.p>
      </div>

      {/* HEATMAP SECTION */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-12">
        <HeatmapSelector />
      </motion.div>

      {/* HABIT LIST SECTION */}
      {habits.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center mt-20 text-gray-400">
          <div className="text-7xl mb-4">📭</div>
          <p className="text-2xl font-light">No habits added</p>
          <p className="text-gray-500 text-sm mt-1">
            Start building your daily routine today.
          </p>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}>
          {habits.map((habit) => (
            <HabitCard
              key={habit.id || habit._id}
              habit={habit}
              onDelete={() => openConfirmModal(habit)} // trigger modal
            />
          ))}
        </motion.div>
      )}

      {/* CENTRALIZED CONFIRMATION MODAL */}
      <ConfirmModals
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to delete "${selectedHabit?.name}"?`}
      />
    </div>
  );
}
