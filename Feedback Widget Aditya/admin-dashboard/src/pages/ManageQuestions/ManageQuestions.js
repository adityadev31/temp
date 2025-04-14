import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ManageQuestions.scss";

const API_BASE_URL = "http://localhost:8080/api/v1/questions/";

const ManageQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswerType, setNewAnswerType] = useState("yesNo");
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [updatedText, setUpdatedText] = useState("");
  const [updatedType, setUpdatedType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Get Auth Headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Session expired. Please log in again.");
      navigate("/login");
      return {};
    }
    return {
      headers: { Authorization: `${token}` },
    };
  };

  // Fetch all questions
  const fetchQuestions = async () => {
    setLoading(true);
    setError("");

    try {
      const config = getAuthHeaders();
      const response = await axios.get(API_BASE_URL, config);
      setQuestions(response.data.data);
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError("Failed to fetch questions.");
      if (err.response?.status === 401) {
        alert("Unauthorized. Please log in again.");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  // Add new question
  const addQuestion = async () => {
    if (!newQuestion.trim()) return;
    setError("");

    try {
      const config = getAuthHeaders();
      await axios.post(
        API_BASE_URL,
        { questionText: newQuestion, type: newAnswerType },
        config
      );
      setNewQuestion("");
      setNewAnswerType("yesNo");
      fetchQuestions();
    } catch (err) {
      console.error("Error adding question:", err);
      setError("Failed to add question.");
    }
  };

  // Delete question
  const deleteQuestion = async (id) => {
    setError("");

    try {
      const config = getAuthHeaders();
      await axios.delete(`${API_BASE_URL}${id}`, config);
      fetchQuestions();
    } catch (err) {
      console.error("Error deleting question:", err);
      setError("Failed to delete question.");
    }
  };

  // Update question
  const updateQuestion = async (id) => {
    if (!updatedText.trim()) return;
    setError("");

    try {
      const config = getAuthHeaders();
      await axios.put(
        `${API_BASE_URL}${id}`,
        { questionText: updatedText, type: updatedType },
        config
      );
      setEditingQuestion(null);
      fetchQuestions();
    } catch (err) {
      console.error("Error updating question:", err);
      setError("Failed to update question.");
    }
  };

  // Publish/Unpublish question
  const togglePublish = async (id, isPublished) => {
    setError("");

    try {
      const config = getAuthHeaders();
      await axios.put(`${API_BASE_URL}${id}`, { published: !isPublished }, config);
      fetchQuestions();
    } catch (err) {
      console.error("Error updating publish status:", err);
      setError("Failed to update publish status.");
    }
  };

  return (
    <div className="manage-questions">
      <button className="back-button" onClick={() => navigate(-1)}>⬅ Back</button>
      <h1>Manage Questions</h1>

      {error && <p className="error">{error}</p>}

      {/* Add New Question */}
      <div className="add-question">
        <input
          type="text"
          placeholder="Enter new question..."
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <select
          value={newAnswerType}
          onChange={(e) => setNewAnswerType(e.target.value)}
        >
          <option value="yesNo">Yes/No</option>
          <option value="description">Description</option>
          <option value="rating">Rating</option>
        </select>
        <button onClick={addQuestion} disabled={loading}>
          {loading ? "Adding..." : "Add Question"}
        </button>
      </div>

      {/* Loading State */}
      {loading && <p>Loading questions...</p>}

      {/* Questions List */}
      <div className="questions-list">
        {questions.length > 0 ? (
          questions.map((q) => (
            <div key={q._id} className="question-item">
              {editingQuestion === q._id ? (
                <>
                  <input
                    type="text"
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                  />
                  <select
                    value={updatedType}
                    onChange={(e) => setUpdatedType(e.target.value)}
                  >
                    <option value="yesNo">Yes/No</option>
                    <option value="description">Description</option>
                    <option value="rating">Rating</option>
                  </select>
                </>
              ) : (
                <>
                  <p><strong>Question:</strong> {q.questionText}</p>
                  <p><strong>Type:</strong> {q.type}</p>
                </>
              )}

              <div className="actions">
                {editingQuestion === q._id ? (
                  <button onClick={() => updateQuestion(q._id)}>Save</button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingQuestion(q._id);
                      setUpdatedText(q.questionText);
                      setUpdatedType(q.type);
                    }}
                  >
                    Edit
                  </button>
                )}
                <button onClick={() => deleteQuestion(q._id)}>Delete</button>
                <button onClick={() => togglePublish(q._id, q.published)}>
                  {q.published ? "Unpublish" : "Publish"}
                </button>
              </div>
            </div>
          ))
        ) : (
          !loading && <p>No questions available.</p>
        )}
      </div>
    </div>
  );
};

export default ManageQuestions;
