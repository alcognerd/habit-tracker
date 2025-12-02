import { getColor } from "./heatmapUtils";

const HeatmapCell = ({ cell, index }) => {
  return (
    <div
      key={index}
      className={`w-5 h-5 rounded-sm ${getColor(cell.value)}`}
      {...(cell.value !== null ? { title: `${cell.key}: ${cell.value}` } : {})}
      style={{ gridRow: (index % 7) + 1 }}></div>
  );
};

export default HeatmapCell;
