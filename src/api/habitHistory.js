import axios from "axios";
import backendUrl from "./Constanceapi";

export const getHabitHistory = async (year) => {
  try {
    const response = await axios.get(
      `${backendUrl}/api/habits/history?year=${year}`,
      { withCredentials: true }
    );

    return response.data.data; // only the actual data
  } catch (error) {
    console.error("Error getting habit history:", error);
    return [];
  }
};
