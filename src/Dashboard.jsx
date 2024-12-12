import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./dashboard.css";

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract user name from state passed during navigation
  const userName = location.state?.name || "User";

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to the Dashboard</h1>
      <p>Hello, {userName}!</p>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
