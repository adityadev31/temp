const mongoose = require("mongoose");

// Question Schema
const questionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["yesNo", "description", "rating"],
      required: true,
    },
    yesNoAnswer: {
        type: Boolean,
    },
    descriptionAnswer: {
        type: String,
    },
    ratingAnswer: {
        type: Number,
    },
    published: {
        type: Boolean,
        default: true,
    }
  },
  {
    timestamps: true,
  }
);

const questionModel = mongoose.model("question", questionSchema);

class Question {
  createQuestion = async (data) => {
    const question = new questionModel(data);
    return await question.save();
  };

  getQuestionById = async (questionId) => {
    return await questionModel.findById(questionId);
  };

  getAllQuestions = async () => {
    return await questionModel.find();
  };

  getAllPublishedQuestions = async () => {
    return await questionModel.find({published: true});
  };

  getAllUnpublishedQuestions = async () => {
    return await questionModel.find({published: false});
  };

  updateQuestionById = async (questionId, data) => {
    return await questionModel.findByIdAndUpdate(questionId, data, { new: true });
  };

  deleteQuestionById = async (questionId) => {
    return await questionModel.findByIdAndDelete(questionId);
  };
}

module.exports = {
    questionDB: new Question(),
    questionSchema
};