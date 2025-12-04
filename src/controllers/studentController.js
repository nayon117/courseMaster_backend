import Course from "../models/Course.js";
import StudentCourse from "../models/StudentCourse.js";

export const enrollCourse = async (req, res) => {
  const { courseId } = req.params;
  const studentId = req.user._id;

  const existing = await StudentCourse.findOne({ studentId, courseId });
  if (existing) return res.status(400).json({ success: false, message: "Already enrolled" });

  const course = await Course.findById(courseId);
  if (!course) return res.status(404).json({ success: false, message: "Course not found" });

  const progress = course.syllabus.map(lesson => ({ lessonId: lesson._id }));

  const studentCourse = new StudentCourse({ studentId, courseId, progress });
  await studentCourse.save();

  res.json({ success: true, data: studentCourse });
};

// Get all enrolled courses
export const getEnrolledCourses = async (req, res) => {
  const studentId = req.user._id;
  const courses = await StudentCourse.find({ studentId }).populate("courseId");
  res.json({ success: true, data: courses });
};

// Get single enrolled course details
export const getCourseDetails = async (req, res) => {
  const { courseId } = req.params;
  const studentId = req.user._id;

  const studentCourse = await StudentCourse.findOne({ studentId, courseId });
  if (!studentCourse) return res.status(404).json({ success: false, message: "Not enrolled" });

  const course = await Course.findById(courseId);
  res.json({ success: true, course, progress: studentCourse.progress });
};

// Mark lesson as complete
export const markLessonComplete = async (req, res) => {
  const { courseId, lessonId } = req.params;
  const studentId = req.user._id;

  const studentCourse = await StudentCourse.findOne({ studentId, courseId });
  if (!studentCourse) return res.status(404).json({ success: false, message: "Not enrolled" });

  const lesson = studentCourse.progress.find(l => l.lessonId.toString() === lessonId);
  if (lesson) lesson.completed = true;

  await studentCourse.save();
  res.json({ success: true, message: "Lesson marked complete", progress: studentCourse.progress });
};

// Submit assignment
export const submitAssignment = async (req, res) => {
  const { courseId, lessonId } = req.params;
  const { answer } = req.body;
  const studentId = req.user._id;

  const studentCourse = await StudentCourse.findOne({ studentId, courseId });
  if (!studentCourse) return res.status(404).json({ success: false, message: "Not enrolled" });

  const lesson = studentCourse.progress.find(l => l.lessonId.toString() === lessonId);
  if (lesson) lesson.assignment = answer;

  await studentCourse.save();
  res.json({ success: true, message: "Assignment submitted" });
};

// Submit quiz
export const submitQuiz = async (req, res) => {
  const { courseId, lessonId } = req.params;
  const { score } = req.body;
  const studentId = req.user._id;

  const studentCourse = await StudentCourse.findOne({ studentId, courseId });
  if (!studentCourse) return res.status(404).json({ success: false, message: "Not enrolled" });

  const lesson = studentCourse.progress.find(l => l.lessonId.toString() === lessonId);
  if (lesson) lesson.quizScore = score;

  await studentCourse.save();
  res.json({ success: true, message: "Quiz submitted", progress: studentCourse.progress });
};
