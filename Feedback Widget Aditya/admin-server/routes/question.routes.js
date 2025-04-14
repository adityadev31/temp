const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { questionDB } = require("../models/question.model");
const { auth, adminAuth } = require("../middlewares/passportAuth");


// Get all questions
router.get("/questions/published",  async (req, res) => {
    try {
      const questions = await questionDB.getAllPublishedQuestions();
      res.status(200).json({ success: true, data: questions });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  // Get all questions
router.get("/questions/unpublished", auth, adminAuth, async (req, res) => {
    try {
      const questions = await questionDB.getAllUnpublishedQuestions();
      res.status(200).json({ success: true, data: questions });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

// Get all questions
router.get("/questions", auth, adminAuth, async (req, res) => {
  try {
    const questions = await questionDB.getAllQuestions();
    res.status(200).json({ success: true, data: questions });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Add a new question
router.post("/questions", auth, adminAuth, async (req, res) => {
    try {
      const newQuestion = await questionDB.createQuestion(req.body);
      res.status(201).json({ success: true, message: "Question added successfully", data: newQuestion });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

// Edit question by ID
router.put("/questions/:id",auth, adminAuth, async (req, res) => {
  try {
    const updatedQuestion = await questionDB.updateQuestionById(req.params.id, req.body);
    if (!updatedQuestion) return res.status(404).json({ success: false, message: "Question not found" });
    res.status(200).json({ success: true, data: updatedQuestion });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Delete question by ID
router.delete("/questions/:id",auth, adminAuth, async (req, res) => {
  try {
    const deletedQuestion = await questionDB.deleteQuestionById(req.params.id);
    if (!deletedQuestion) return res.status(404).json({ success: false, message: "Question not found" });
    res.status(200).json({ success: true, message: "Question deleted successfully" });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});


// Mark question as published
router.patch("/questions/:id/publish", auth, adminAuth, async (req, res) => {
    try {
      const publishedQuestion = await questionDB.updateQuestionById(req.params.id, { published: true });
      if (!publishedQuestion) return res.status(404).json({ success: false, message: "Question not found" });
      res.status(200).json({ success: true, message: "Question published successfully", data: publishedQuestion });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  });
  
  // Unmark question as published
  router.patch("/questions/:id/unpublish", auth, adminAuth, async (req, res) => {
    try {
      const unpublishedQuestion = await questionDB.updateQuestionById(req.params.id, { published: false });
      if (!unpublishedQuestion) return res.status(404).json({ success: false, message: "Question not found" });
      res.status(200).json({ success: true, message: "Question unpublished successfully", data: unpublishedQuestion });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

module.exports = router;

