import Login from "../pages/auth/Login";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import HabitForm from "../pages/forms/HabitForm";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/home/Home";

const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route
          element={<Login />}
          path="/login"
        />
        <Route
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
          path="/"
        />

        <Route
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
          path="/dashboard"
        />

        <Route
          element={
            <ProtectedRoute>
              <HabitForm />
            </ProtectedRoute>
          }
          path="/add-habit"
        />
      </Routes>
    </div>
  );
};

export default AppRouter;
