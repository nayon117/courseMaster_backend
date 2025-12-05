import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  type: { type: String, enum: ["text", "link"], required: true },
  answer: { type: String, default: "" },
  status: { type: String, enum: ["pending", "reviewed"], default: "pending" },
});

const quizSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: String, required: true },
});

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  duration: { type: Number, required: true },
  isFree: { type: Boolean, default: false },

  assignments: { type: [assignmentSchema], default: [] },
  quizzes: { type: [quizSchema], default: [] },
});


const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
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
