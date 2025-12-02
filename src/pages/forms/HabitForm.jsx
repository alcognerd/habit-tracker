import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { createHabit } from "../../api/habit";
import HabitNameInput from "./HabitNameInput";
import FrequencySelector from "./FrequencySelector";
import WeeklyDaysSelector from "./WeeklyDaysSelector";
import CategoryGrid from "./CategoryGrid";
import Spinner from "../../components/common/Spinner";

const dayMap = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

const HabitForm = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("daily");
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const containerRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState("health");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    frequency: "daily",
    days: [...dayMap],
    category: "Health",
  });

  const [validationErrors, setValidationErrors] = useState({
    name: false,
    days: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const errors = {
      name: formData.name.trim() === "",
      days:
        formData.frequency === "weekly" &&
        (!formData.days || formData.days.length === 0),
    };
    setValidationErrors(errors);
    return !errors.name && !errors.days;
  };

  const handleFrequencyChange = (freq) => {
    setActive(freq);
    setFormData((prev) => ({
      ...prev,
      frequency: freq,
      days: freq === "daily" ? [...dayMap] : [],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const isAllDaysSelected =
      formData.frequency === "weekly" && formData.days.length === 7;

    const finalFrequency = isAllDaysSelected
      ? "DAILY"
      : formData.frequency.toUpperCase();

    const finalDays = isAllDaysSelected ? [...dayMap] : formData.days;

    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim() || "",
      category: formData.category.toUpperCase(),
      frequency: finalFrequency,
      days: finalDays,
    };

    try {
      await createHabit(payload);
      navigate("/");
    } catch (error) {
      console.error("Failed to create habit", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0b] via-[#0f0f12] to-[#0a0a0b] text-white relative overflow-hidden">
      <div className="max-w-lg mx-auto px-5 pt-6 pb-14 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => window.history.back()}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <FaChevronLeft className="text-lg text-gray-300" />
          </button>

          <h1 className="text-xl font-semibold text-white">Create Habit</h1>
          <div className="w-10" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6">
          {/* Habit Name */}
          <HabitNameInput
            formData={formData}
            setFormData={setFormData}
            validationErrors={validationErrors}
          />

          {/* Frequency Selector */}
          <FrequencySelector
            active={active}
            setActive={setActive}
            formData={formData}
            setFormData={setFormData}
            indicatorStyle={indicatorStyle}
            setIndicatorStyle={setIndicatorStyle}
            containerRef={containerRef}
            handleFrequencyChange={handleFrequencyChange}
          />

          {/* Weekly Days Selector */}
          {formData.frequency === "weekly" && (
            <WeeklyDaysSelector
              formData={formData}
              setFormData={setFormData}
              validationErrors={validationErrors}
              setActive={setActive}
              handleFrequencyChange={handleFrequencyChange}
            />
          )}

          {/* Category Section */}
          <CategoryGrid
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setFormData={setFormData}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-5 mt-10 rounded-2xl 
              font-semibold text-lg flex items-center justify-center transition
              ${
                isSubmitting
                  ? "opacity-60 cursor-not-allowed bg-indigo-500"
                  : "bg-gradient-to-r from-indigo-500 to-purple-600"
              }`}>
            {isSubmitting ? <Spinner size={26} /> : "Create Habit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HabitForm;
