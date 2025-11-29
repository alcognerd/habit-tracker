import Login from "../pages/auth/Login";
import { Route, Routes } from "react-router-dom";
import AllHabitsPage from "../pages/habits/AllHabitsPage";
import Dashboard from "../pages/dashboard/Dashboard";
import HabitForm from "../pages/forms/HabitForm";

Routes;
const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route
          element={<Login />}
          path="/login"
        />
        <Route
          element={<AllHabitsPage />}
          path="/"
        />
        <Route
          element={<Dashboard />}
          path="/dashboard"
        />
        <Route
          element={<HabitForm />}
          path="/add-habit"
        />
      </Routes>
    </div>
  );
};

export default AppRouter;
