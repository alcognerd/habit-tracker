const HabitNameInput = ({ formData, setFormData, validationErrors }) => {
  return (
    <div className="space-y-4">
      <label className="text-sm text-gray-30 flex gap-2">
        What’s your habit?
      </label>

      <input
        type="text"
        value={formData.name}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, name: e.target.value }))
        }
        className={`w-full p-5 rounded-2xl bg-white/5 border ${
          validationErrors.name ? "border-red-500" : "border-white/10"
        }`}
        placeholder="e.g., Meditate"
      />

      {validationErrors.name && (
        <p className="text-red-400 text-sm">Please enter a habit name</p>
      )}

      <textarea
        rows={3}
        value={formData.description}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            description: e.target.value,
          }))
        }
        className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 resize-none"
        placeholder="Why does it matter?"
      />
    </div>
  );
};

export default HabitNameInput;
