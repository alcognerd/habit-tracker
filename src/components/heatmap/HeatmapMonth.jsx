import HeatmapCell from "./HeatmapCell";
import { daysInMonth } from "./heatmapUtils";

const HeatmapMonth = ({ y, m, isFirst, isLast, year, today, data }) => {
  const days = daysInMonth(m, y);
  const cells = [];

  // -------------------------------------------
  // FIRST MONTH (TRIM BEFORE START DATE)
  // -------------------------------------------
  if (year === "current" && isFirst) {
    const start = new Date(
      today.getFullYear() - 1,
      today.getMonth(),
      today.getDate()
    );
    const startDay = start.getDate();

    for (let d = 1; d < startDay; d++) {
      cells.push({ key: `dummy-${d}`, value: null });
    }

    for (let d = startDay; d <= days; d++) {
      const key = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(
        2,
        "0"
      )}`;
      cells.push({ key, value: data[key] ?? 0 });
    }
  }

  // -------------------------------------------
  // LAST MONTH (TRIM AFTER TODAY)
  // -------------------------------------------
  else if (year === "current" && isLast) {
    const endDay = today.getDate();
    const firstDay = new Date(y, m, 1).getDay();

    for (let d = 0; d < firstDay; d++) {
      cells.push({ key: `dummy-before-${d}`, value: null });
    }

    for (let d = 1; d <= endDay; d++) {
      const key = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(
        2,
        "0"
      )}`;
      cells.push({ key, value: data[key] ?? 0 });
    }

    for (let d = endDay + 1; d <= days; d++) {
      cells.push({ key: `dummy-after-${d}`, value: null });
    }
  }

  // -------------------------------------------
  // MIDDLE MONTHS
  // -------------------------------------------
  else {
    const firstDay = new Date(y, m, 1).getDay();
    const lastDay = new Date(y, m, days).getDay();

    for (let i = 0; i < firstDay; i++)
      cells.push({ key: `b-${i}`, value: null });

    for (let d = 1; d <= days; d++) {
      const key = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(
        2,
        "0"
      )}`;
      cells.push({ key, value: data[key] ?? 0 });
    }

    for (let i = 0; i < 6 - lastDay; i++)
      cells.push({ key: `a-${i}`, value: null });
  }

  return (
    <div className="flex flex-col">
      {/* MONTH NAME */}
      <div className="text-center font-semibold text-sm mb-2">
        {new Date(y, m).toLocaleString("default", {
          month: "short",
          year: "2-digit",
        })}
      </div>

      {/* GRID */}
      <div className="grid grid-rows-7 auto-cols-max gap-0.5">
        {cells.map((cell, index) => (
          <HeatmapCell
            key={index}
            cell={cell}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default HeatmapMonth;
