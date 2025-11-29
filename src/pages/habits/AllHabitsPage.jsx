import { BsFillDropletFill } from "react-icons/bs";
import HabitCard from "../../components/habits/HabitCard";
import { FaDumbbell } from "react-icons/fa";
import { FiBookOpen, FiCoffee } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AllHabitsPage() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/dashboard");
  };

  const habits = [
    {
      id: 1,
      name: "Drink Water",
      icon: BsFillDropletFill,
      frequency: "Daily",
      color: "blue",
    },
    {
      id: 2,
      name: "Morning Workout",
      icon: FaDumbbell,
      frequency: "Daily",
      color: "purple",
    },
    {
      id: 3,
      name: "Read 30 mins",
      icon: FiBookOpen,
      frequency: "Daily",
      color: "indigo",
    },
    {
      id: 4,
      name: "Meditate",
      icon: FiCoffee,
      frequency: "Weekdays",
      color: "violet",
    },
  ];

  const handleDelete = (habitId) => {
    console.log("Deleting habit:", habitId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen bg-background gradient-bg text-white px-6 py-6 pb-28">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Your Habits</h1>

        <button
          onClick={handleNavigate}
          className="px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-xl 
          text-sm hover:bg-neutral-800 transition-all">
          Dashboard
        </button>
      </div>

      {/* Habit Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {habits.map((habit) => (
          <motion.div
            key={habit.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}>
            <HabitCard
              habit={habit}
              onDelete={handleDelete}
            />
          </motion.div>
        ))}
      </div>

      {/* Floating Add Habit Button */}
      <button
        onClick={() => navigate("/add-habit")}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-500 
          active:scale-95 text-white w-14 h-14 rounded-2xl flex items-center 
          justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)] 
          backdrop-blur-md transition-all duration-300">
        <span className="text-3xl font-bold leading-none">+</span>
      </button>
    </motion.div>
  );
}
