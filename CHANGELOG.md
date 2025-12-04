# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] – 03-12-2025 – Frontend Initial Release

### Added

#### Authentication
- User Signup page
- User Login page
- JWT-based authentication handling
- Protected routes (Dashboard, Habits Page)
- Global `AuthContext` for managing session state

#### Habit Management (CRUD)
- Create new habit
- View all habits
- Delete habit
- UI validations and error messages

#### Habit Logging
- Mark habit as completed
- Skip habit for the day
- Display “completed today” status
- Re-fetch updated habit state after logging

#### Dashboard
- Total habits overview
- Heatmap visualization added

#### API Integration
- Integrated with Spring Boot backend for:
  - Authentication
  - Habits CRUD
  - Logging

#### UI/UX
- Responsive layout using React + Tailwind CSS
- Clean, minimal cards for habits

### Tech Stack
- React 19
- Tailwind CSS
- React Router DOM
- Axios for API calls
- Context API for global state management
- Vite (or CRA based on your setup)
