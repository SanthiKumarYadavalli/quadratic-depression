/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import CreateEventPage from "./pages/CreateEventPage.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";

import Navbar from "./components/Navbar.jsx";
import { useAuthContext } from "./context/AuthContext";

import useTheme from "./hooks/useTheme";

function App() {
  const [theme] = useTheme();
  const { authUser, loading } = useAuthContext();
  console.log("Authenticated user:", authUser);

  if (loading) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="max-w-5xl mt-0 text-white mx-auto p-4 sm:p-6 lg:p-8 transition-all duration-300 flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login/"
            element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/signup/"
            element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/events/"
            element={authUser ? <EventsPage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/dashboard/"
            element={authUser ? <UserDashboard /> : <Navigate to={"/login"} />}
          />
          <Route path="/create-event/" element={<CreateEventPage />} />
\        </Routes>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
