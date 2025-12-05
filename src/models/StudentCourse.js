import mongoose from "mongoose";

const LessonProgressSchema = new mongoose.Schema({
  lessonId: { type: mongoose.Schema.Types.ObjectId, required: true },
  completed: { type: Boolean, default: false },
  assignment: { type: String, default: "" },
  marks: { type: Number, default: 0 }        
});

const StudentCourseSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  progress: [LessonProgressSchema],
  createdAt: { type: Date, default: Date.now }
});

const StudentCourse = mongoose.model("StudentCourse", StudentCourseSchema);
export default StudentCourse;
