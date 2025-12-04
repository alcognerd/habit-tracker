import React from "react";

export default function ConfirmModals({
  show,
  onClose,
  onConfirm,
  title,
  message,
}) {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}>
      <div
        className="bg-[#111111] rounded-2xl p-6 w-80 text-center border border-gray-800/60 shadow-lg"
        onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold text-gray-100 mb-4">{title}</h3>
        <p className="text-gray-400 mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
