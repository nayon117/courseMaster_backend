import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema({
  type: { type: String, enum: ["link", "text"], default: "text" }, // type of submission
  answer: String, // Google Drive link or text
  status: { type: String, enum: ["pending", "reviewed"], default: "pending" },
});

const QuizSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String, 
});

const LessonSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
  duration: Number,
  isFree: { type: Boolean, default: false },
  assignments: [AssignmentSchema], 
  quizzes: [QuizSchema],          
});

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  instructor: String,
  category: String,
  tags: [String],
  syllabus: [LessonSchema],
  price: Number,
  thumbnail: String,
  createdAt: { type: Date, default: Date.now },
});

const Course = mongoose.model("Course", CourseSchema);
export default Course;
