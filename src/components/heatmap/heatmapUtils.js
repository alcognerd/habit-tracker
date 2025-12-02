// utils for heatmap calendar

export const daysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getColor = (value) => {
  if (value === null) return "bg-transparent";
  if (value === 0) return "bg-zinc-600";
  if (value < 3) return "bg-green-200";
  if (value < 6) return "bg-green-400";
  if (value < 10) return "bg-green-600";
  return "bg-green-800";
};

export const weekdays = ["", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = 2020; y <= currentYear; y++) years.push(y);
  return years.reverse();
};
