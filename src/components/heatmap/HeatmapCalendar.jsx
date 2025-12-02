import HeatmapMonth from "./HeatmapMonth";
import { weekdays } from "./heatmapUtils";

const HeatmapCalendar = ({ data, year }) => {
  const today = new Date();
  let monthsToDisplay = [];

  // =============== LAST 12 MONTHS ==================
  if (year === "current") {
    const start = new Date(
      today.getFullYear() - 1,
      today.getMonth(),
      today.getDate()
    );

    let temp = new Date(start.getFullYear(), start.getMonth(), 1);

    while (
      temp.getFullYear() < today.getFullYear() ||
      (temp.getFullYear() === today.getFullYear() &&
        temp.getMonth() <= today.getMonth())
    ) {
      monthsToDisplay.push({
        y: temp.getFullYear(),
        m: temp.getMonth(),
        isFirst:
          temp.getFullYear() === start.getFullYear() &&
          temp.getMonth() === start.getMonth(),
        isLast:
          temp.getFullYear() === today.getFullYear() &&
          temp.getMonth() === today.getMonth(),
      });

      temp.setMonth(temp.getMonth() + 1);
    }
  }

  // =============== SPECIFIC YEAR MODE ==================
  else {
    for (let m = 0; m < 12; m++) {
      monthsToDisplay.push({ y: Number(year), m });
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Heatmap – {year === "current" ? "Last 12 Months" : year}
      </h2>

      <div className="flex w-[calc(100vw-10vw)] overflow-x-auto">
        {/* WEEKDAY LABELS */}
        <div className="flex flex-col gap-0.5 py-2 sticky left-0 z-10 bg-black">
          {weekdays.map((d, idx) => (
            <div
              key={idx}
              className="flex items-center h-5 text-xs font-medium text-gray-300 px-4">
              {d}
            </div>
          ))}
        </div>

        {/* MONTH BLOCKS */}
        <div className="flex gap-2 px-2">
          {monthsToDisplay.map((obj, i) => (
            <HeatmapMonth
              key={i}
              {...obj}
              data={data}
              today={today}
              year={year}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeatmapCalendar;
