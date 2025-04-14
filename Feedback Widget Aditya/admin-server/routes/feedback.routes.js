const express = require("express");
const router = express.Router();
const { Feedback } = require("../models/feedback.model");
const { auth, adminAuth } = require("../middlewares/passportAuth");

// Submit feedback
router.post("/feedbacks", async (req, res) => {
  try {
    const feedback = await Feedback.createFeedback(req.body);
    res.status(201).json({ success: true, message: "Feedback submitted successfully", data: feedback });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Fetch feedback by ID
router.get("/feedbacks/:id", auth, adminAuth, async (req, res) => {
  try {
    const feedback = await Feedback.getFeedbackById(req.params.id);
    if (!feedback) return res.status(404).json({ success: false, message: "Feedback not found" });
    res.status(200).json({ success: true, data: feedback });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Fetch all feedbacks
router.get("/feedbacks", auth, adminAuth, async (req, res) => {
  try {
    const feedbacks = await Feedback.getFeedbacks();
    res.status(200).json({ success: true, data: feedbacks });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;

