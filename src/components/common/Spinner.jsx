import React from "react";

export default function Spinner({ size = 40 }) {
  return (
    <div
      className="animate-spin rounded-full border-4 border-gray-600 border-t-transparent"
      style={{
        width: size,
        height: size,
      }}></div>
  );
}
