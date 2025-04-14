import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.scss";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalFeedbacks: 0,
    totalQuestions: 0,
    publishedQuestions: 0,
    unpublishedQuestions: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `${token}`
        }
      };

      const feedbackRes = await axios.get("http://localhost:8080/api/v1/feedbacks/", config);
      const allQuestionsRes = await axios.get("http://localhost:8080/api/v1/questions/", config);
      const publishedRes = await axios.get("http://localhost:8080/api/v1/questions/published", config);
      const unpublishedRes = await axios.get("http://localhost:8080/api/v1/questions/unpublished", config);

      setStats({
        totalFeedbacks: feedbackRes.data.data.length,
        totalQuestions: allQuestionsRes.data.data.length,
        publishedQuestions: publishedRes.data.data.length,
        unpublishedQuestions: unpublishedRes.data.data.length,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <nav>
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </nav>

      <div className="stats">
        <StatCard title="Total Feedbacks" count={stats.totalFeedbacks} color="green" />
        <StatCard title="Total Questions" count={stats.totalQuestions} color="blue" />
        <StatCard title="Published Questions" count={stats.publishedQuestions} color="yellow" />
        <StatCard title="Unpublished Questions" count={stats.unpublishedQuestions} color="red" />
      </div>

      <div className="sections">
        <DashboardSection title="Manage Questions" buttonText="Go to Questions" onClick={() => navigate("/questions")} />
        <DashboardSection title="View Feedbacks" buttonText="View Feedback" onClick={() => navigate("/feedbacks")} />
      </div>
    </div>
  );
};

//Stats Card
const StatCard = ({ title, count, color }) => (
  <div className={`stat-card ${color}`}>
    <h2>{title}</h2>
    <p>{count}</p>
  </div>
);

// Section Component
const DashboardSection = ({ title, buttonText, onClick }) => (
  <div className="section">
    <h3>{title}</h3>
    <button onClick={onClick}>{buttonText}</button>
  </div>
);

export default Dashboard;
