import express from "express";
import {
  enrollCourse,
  getEnrolledCourses,
  getCourseDetails,
  markLessonComplete,
  submitAssignment,
  submitQuiz,
} from "../controllers/studentController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

// All routes protected
router.use(protect);

// Enroll in a course
router.post("/courses/:courseId/enroll", enrollCourse);

// Get all enrolled courses + progress
router.get("/courses", getEnrolledCourses);

// Get details of a specific enrolled course
router.get("/courses/:courseId", getCourseDetails);

// Mark lesson complete
router.patch("/courses/:courseId/lesson/:lessonId", markLessonComplete);

// Submit assignment
router.post("/courses/:courseId/lesson/:lessonId/assignment", submitAssignment);

// Submit quiz
router.post("/courses/:courseId/lesson/:lessonId/quiz", submitQuiz);

export default router;
