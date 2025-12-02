import { useState, useEffect } from "react";
import HeatmapCalendar from "./HeatmapCalendar";
import { getHabitHistory } from "../../api/habitHistory";
import { generateYearOptions } from "./heatmapUtils";

const HeatmapSelector = () => {
  const [selectedYear, setSelectedYear] = useState("current");
  const [heatmapData, setHeatmapData] = useState({});
  const options = generateYearOptions();

  useEffect(() => {
    const fetchHabitHistory = async () => {
      const data = await getHabitHistory(selectedYear);

      if (!data || data.length === 0) {
        setHeatmapData([]); // empty heatmap
        return;
      }

      setHeatmapData(data);
    };

    fetchHabitHistory();
  }, [selectedYear]);
  console.log(heatmapData);

  return (
    <div className="flex flex-col justify-end items-center p-4 space-y-6 w-full">
      {/* Dropdown */}
      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
        className="border p-2 rounded w-fit self-end">
        <option
          className="bg-black text-white"
          value="current">
          Last 365 Days
        </option>
        {options.map((y) => (
          <option
            className="bg-black text-white"
            key={y}
            value={y}>
            {y}
          </option>
        ))}
      </select>

      {/* Heatmap */}
      <HeatmapCalendar
        data={heatmapData}
        year={selectedYear}
      />
      {/* Legend */}
      <div className="flex flex-col items-center mt-4">
        <span className="text-sm text-gray-400 mb-1">Activity Level</span>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">Less</span>

          <div className="w-4 h-4 rounded bg-transparent border border-zinc-700"></div>
          <div className="w-4 h-4 rounded bg-zinc-600"></div>
          <div className="w-4 h-4 rounded bg-green-200"></div>
          <div className="w-4 h-4 rounded bg-green-400"></div>
          <div className="w-4 h-4 rounded bg-green-600"></div>
          <div className="w-4 h-4 rounded bg-green-800"></div>

          <span className="text-xs text-gray-500">More</span>
        </div>
      </div>
    </div>
  );
};

export default HeatmapSelector;
