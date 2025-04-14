import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import ManageQuestions from "./pages/ManageQuestions/ManageQuestions";
import Feedbacks from "./pages/Feedbacks/Feedbacks";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";
import Signup from "./pages/Signup/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/questions"
          element={
            <PrivateRoute>
              <ManageQuestions />
            </PrivateRoute>
          }
        />
        <Route
          path="/feedbacks"
          element={
            <PrivateRoute>
              <Feedbacks />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
