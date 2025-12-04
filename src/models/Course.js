import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
  duration: Number,
  isFree: { type: Boolean, default: false },
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
