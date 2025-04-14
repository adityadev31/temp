const mongoose =  require("mongoose");
const { questionSchema } = require("./question.model");


// Feedback Schema
const feedbackSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: "user",
        },
        questions: [questionSchema],
        status: {
            type: String,
            enum: ["pending", "completed"],
            default: "completed",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const feedbackModel = mongoose.model("feedback", feedbackSchema);

class Feedback {
    createFeedback = async (data) => {
        const feedback = new feedbackModel(data);
        return await feedback.save();
    };

    getFeedbacks = async () => {
        return await feedbackModel.find();
    }

    getFeedbackById = async (feedbackId) => {
        return await feedbackModel.findById(feedbackId).populate("userId");
    };

    getFeedbacksByUserId = async (userId) => {
        return await feedbackModel.find({ user: userId });
    };

    updateFeedbackById = async (feedbackId, data) => {
        return await feedbackModel.findByIdAndUpdate(feedbackId, data, { new: true });
    };

    deleteFeedbackById = async (feedbackId) => {
        return await feedbackModel.findByIdAndDelete(feedbackId);
    };
}

module.exports.Feedback = new Feedback();

