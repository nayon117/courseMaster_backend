import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  type: { type: String, enum: ["text", "link"]},
  answer: { type: String, default: "" },
  status: { type: String, enum: ["pending", "reviewed"], default: "pending" },
});

const quizSchema = new mongoose.Schema({
  question: { type: String},
  options: [{ type: String}],
  answer: { type: String},
});

const lessonSchema = new mongoose.Schema({
  title: { type: String },
  videoUrl: { type: String },
  duration: { type: Number},
  isFree: { type: Boolean, default: false },

  assignments: { type: [assignmentSchema], default: [] },
  quizzes: { type: [quizSchema], default: [] },
});


const courseSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    description: { type: String},
    instructor: { type: String, default: "" },
    category: { type: String, default: "" },
    tags: [{ type: String }],
    price: { type: Number, default: 0 },
    thumbnail: { type: String, default: "" },

    syllabus: [lessonSchema],
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
