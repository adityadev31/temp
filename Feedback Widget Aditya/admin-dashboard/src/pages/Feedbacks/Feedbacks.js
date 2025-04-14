import { useEffect, useState } from "react";
import axios from "axios";
import "./Feedbacks.scss";
import { useNavigate } from "react-router-dom";

const Feedbacks = () => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Fetch all feedback responses
  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `${token}` },
      };
      const response = await axios.get("http://localhost:8080/api/v1/feedbacks", config);
      console.log("Feedback Response:", response.data.data);

      const completedFeedbacks = response.data.data.filter(
        (fb) => fb.status === "completed" && fb.questions.length > 0
      );

      setFeedbacks(completedFeedbacks);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="view-feedbacks">
      <button className="back-button" onClick={() => navigate(-1)}>⬅ Back</button>
      <h1>View Feedbacks</h1>

      {loading ? (
        <p>Loading feedbacks...</p>
      ) : feedbacks.length === 0 ? (
        <p>No feedbacks available.</p>
      ) : (
        <div className="feedback-list">
          {feedbacks.map((fb) => (
            <div key={fb._id} className="feedback-item">
              <p><strong>Submitted At:</strong> {new Date(fb.createdAt).toLocaleString()}</p>
              <ul>
                {fb.questions.map((q) => (
                  <li key={q._id}>
                    <strong>{q.questionText}</strong>:
                    {q.type === "yesNo" && (q.yesNoAnswer ? " Yes" : " No")}
                    {q.type === "rating" && ` ${q.ratingAnswer}/5`}
                    {q.type === "description" && ` ${q.descriptionAnswer}`}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feedbacks;
