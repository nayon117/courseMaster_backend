import mongoose from "mongoose";

const assignmentSubmissionSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  module: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  marks: {
    type: Number,
    default: null
  }
}, { timestamps: true });

const AssignmentSubmission = mongoose.model("AssignmentSubmission", assignmentSubmissionSchema);

export default AssignmentSubmission;
