import React from "react";
import { HiOutlineTrash, HiOutlineX } from "react-icons/hi";

export default function DeleteHabitModal({
  isOpen,
  onClose,
  onConfirm,
  habitName = "this habit",
}) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-[#121212] border border-gray-800 rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200"
          onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-500/15 rounded-xl flex items-center justify-center">
                <HiOutlineTrash className="w-6 h-6 text-red-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-100">Delete Habit?</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
              <HiOutlineX className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Warning Message */}
          <p className="text-gray-400 text-sm leading-relaxed">
            Are you sure you want to delete{" "}
            <span className="text-gray-200 font-medium">“{habitName}”</span>?
            This will permanently remove all progress and streak data. This
            action cannot be undone.
          </p>

          {/* Buttons */}
          <div className="flex gap-3 mt-8">
            <button
              onClick={onClose}
              className="flex-1 px-5 py-3 rounded-xl border border-gray-700 text-gray-300 font-medium hover:bg-gray-800/50 transition-all">
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium shadow-lg shadow-red-900/20 transition-all hover:shadow-red-900/30">
              Delete Habit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
