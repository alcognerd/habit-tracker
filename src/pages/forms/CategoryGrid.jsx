import React from "react";
import { FaRegHeart, FaRegSmile, FaRegStar } from "react-icons/fa";
import { MdOutlineFitnessCenter, MdOutlineWorkOutline } from "react-icons/md";
import { IoMusicalNotes, IoBookOutline, IoSunnySharp } from "react-icons/io5";
import { FiMoon } from "react-icons/fi";
import { AiFillThunderbolt } from "react-icons/ai";
import { GoGoal } from "react-icons/go";
import { FaGlassWater } from "react-icons/fa6";

const categories = [
  {
    id: "health",
    label: "Health",
    icon: <FaRegHeart />,
    gradient: "from-emerald-400 to-teal-600",
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
    gradient: "from-purple-500 to-indigo-700",
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
    gradient: "from-amber-500 to-orange-600",
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
    gradient: "from-violet-600 to-purple-700",
  },
  {
    id: "social",
    label: "Social",
    icon: <FaRegSmile />,
    gradient: "from-pink-400 to-rose-600",
  },
  {
    id: "goals",
    label: "Goals",
    icon: <GoGoal />,
    gradient: "from-green-500 to-emerald-700",
  },
  {
    id: "other",
    label: "Other",
    icon: <FaRegStar />,
    gradient: "from-gray-400 to-slate-600",
  },
];

const CategoryGrid = ({
  selectedCategory,
  setSelectedCategory,
  setFormData,
}) => {
  return (
    <div className="space-y-5 flex flex-col">
      <label className="text-sm text-gray-300 font-medium px-2">
        Pick a vibe
      </label>

      <div className="grid grid-cols-4 gap-5">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => {
              setSelectedCategory(cat.id);
              setFormData((prev) => ({ ...prev, category: cat.id }));
            }}
            className="flex flex-col items-center cursor-pointer group">
            {/* Icon Wrapper */}
            <div
              className={`w-20 h-20 flex items-center justify-center 
              rounded-3xl transition-all duration-200 border 
              ${
                selectedCategory === cat.id
                  ? `bg-gradient-to-br ${cat.gradient} text-white border-transparent scale-105 shadow-lg shadow-black/30`
                  : "bg-white/5 border-white/10 text-gray-300 group-hover:bg-white/10"
              }`}>
              <div className="text-3xl flex items-center justify-center">
                {cat.icon}
              </div>
            </div>

            {/* Label */}
            <p
              className={`mt-3 text-xs text-center font-medium transition-all
                ${
                  selectedCategory === cat.id
                    ? "text-white"
                    : "text-gray-400 group-hover:text-gray-200"
                }`}>
              {cat.label}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
