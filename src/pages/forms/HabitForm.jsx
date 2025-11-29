import React, { useEffect, useRef, useState } from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import {
  FaChevronLeft,
  FaRegCalendarAlt,
  FaRegHeart,
  FaRegSmile,
  FaRegStar,
} from "react-icons/fa";
import { FaGlassWater, FaRegCalendarDays } from "react-icons/fa6";
import { FiMoon } from "react-icons/fi";
import { GoGoal } from "react-icons/go";
import { IoBookOutline, IoMusicalNotes, IoSunnySharp } from "react-icons/io5";
import { MdOutlineFitnessCenter, MdOutlineWorkOutline } from "react-icons/md";
import {HabitService} from "../../api/habitService";

const options = [
  { id: "daily", label: "Daily", icon: <FaRegCalendarAlt /> },
  { id: "weekly", label: "Weekly", icon: <FaRegCalendarDays /> },
];

const categories = [
  {
    id: "health",
    label: "Health",
    icon: <FaRegHeart />,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: "fitness",
    label: "Fitness",
    icon: <MdOutlineFitnessCenter />,
    gradient: "from-orange-500 to-red-600",
  },
  {
    id: "mind",
    label: "Mind",
    icon: <FiMoon />,
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    id: "learn",
    label: "Learn",
    icon: <IoBookOutline />,
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    id: "work",
    label: "Work",
    icon: <MdOutlineWorkOutline />,
    gradient: "from-pink-500 to-rose-600",
  },
  {
    id: "create",
    label: "Create",
    icon: <IoMusicalNotes />,
    gradient: "from-yellow-500 to-amber-600",
  },
  {
    id: "hydrate",
    label: "Hydrate",
    icon: <FaGlassWater />,
    gradient: "from-cyan-400 to-blue-600",
  },
  {
    id: "morning",
    label: "Morning",
    icon: <IoSunnySharp />,
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    id: "focus",
    label: "Focus",
    icon: <AiFillThunderbolt />,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    id: "social",
    label: "Social",
    icon: <FaRegSmile />,
    gradient: "from-pink-400 to-rose-500",
  },
  {
    id: "goals",
    label: "Goals",
    icon: <GoGoal />,
    gradient: "from-green-500 to-emerald-600",
  },
  {
    id: "other",
    label: "Other",
    icon: <FaRegStar />,
    gradient: "from-gray-500 to-slate-600",
  },
];

const HabitForm = () => {
  const [active, setActive] = useState("daily");
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const containerRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("health");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    frequency: "daily",
    category: "health",
  });

  const [validationErrors, setValidationErrors] = useState({ name: false });
  const habitService = new HabitService();

  // Frequency slider indicator (smooth but not flashy)
  const updateIndicator = () => {
    if (!containerRef.current) return;
    const activeBtn = containerRef.current.querySelector(
      `[data-id="${active}"]`
    );
    if (!activeBtn) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();

    setIndicatorStyle({
      width: `${btnRect.width}px`,
      transform: `translateX(${btnRect.left - containerRect.left}px)`,
    });
  };

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [active]);

  const validateForm = () => {
    const errors = { name: formData.name.trim() === "" };
    setValidationErrors(errors);
    return !errors.name;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      habitService.createHabit(formData);
    }
  };

  const selectedGradient =
    categories.find((c) => c.id === selectedCategory)?.gradient ||
    "from-indigo-500 to-purple-600";

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <div className="max-w-lg mx-auto px-4 pt-6 pb-12">
        {/* Header */}
        <div className="flex items-center justify-center py-6 mb-8 relative">
          <button
            onClick={() => window.history.back()}
            className="absolute left-0 p-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition">
            <FaChevronLeft className="text-lg text-gray-300" />
          </button>
          <h1 className="text-2xl font-bold">Create New Habit</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8">
          {/* Habit Name */}
          <div className="space-y-3">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider pl-1">
              Habit Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="e.g., Meditate 10 minutes"
              className={`w-full px-5 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border 
                ${
                  validationErrors.name
                    ? "border-red-500/70"
                    : "border-white/10"
                }
                focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 
                placeholder:text-gray-500 transition-colors duration-200`}
            />
            {validationErrors.name && (
              <p className="text-red-400 text-xs pl-1">
                Please enter a habit name
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-3">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider pl-1">
              Description <span className="text-gray-600">(optional)</span>
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Why this habit matters..."
              className="w-full px-5 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 
                         focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 
                         placeholder:text-gray-500 resize-none transition-colors duration-200"
            />
          </div>

          {/* Frequency */}
          <div className="space-y-4">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider pl-1">
              Frequency
            </label>
            <div
              ref={containerRef}
              className="relative flex bg-white/5 backdrop-blur-xl rounded-2xl p-2 border border-white/10">
              <div
                className="absolute inset-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl transition-all duration-300"
                style={indicatorStyle}
              />
              {options.map((opt) => (
                <button
                  key={opt.id}
                  data-id={opt.id}
                  type="button"
                  onClick={() => {
                    setActive(opt.id);
                    setFormData((prev) => ({ ...prev, frequency: opt.id }));
                  }}
                  className={`relative z-10 flex-1 flex items-center justify-center gap-2.5 py-4 rounded-xl font-medium text-sm transition-colors duration-200 ${
                    active === opt.id
                      ? "text-white"
                      : "text-gray-400 hover:text-gray-200"
                  }`}>
                  <span className="text-xl">{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Grid */}
          <div className="space-y-4">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider pl-1">
              Category
            </label>
            <div className="grid grid-cols-4 gap-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setFormData((prev) => ({ ...prev, category: cat.id }));
                  }}
                  className="space-y-2">
                  <div
                    className={`p-5 rounded-2xl border-2 transition-all duration-300 ${
                      selectedCategory === cat.id
                        ? `bg-gradient-to-br ${cat.gradient} border-transparent shadow-lg`
                        : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                    }`}>
                    <div className="text-2xl">{cat.icon}</div>
                  </div>
                  <p
                    className={`text-xs font-medium text-center ${
                      selectedCategory === cat.id
                        ? "text-white"
                        : "text-gray-500"
                    }`}>
                    {cat.label}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className={`w-full py-5 mt-10 rounded-2xl font-bold text-lg tracking-wide
              bg-gradient-to-r ${selectedGradient}
              shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-98`}>
            Save Habit
          </button>
        </form>
      </div>
    </div>
  );
};

export default HabitForm;
