import express from "express";
import { adminOnly, protect } from "../middlewares/auth.js";

import {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  createBatch,
  getCourseStudents,
  getBatchStudents,
  getAllAssignments,
  reviewAssignment,
  getAdminMiniStats,
  getPendingAssignments,
  getAllStudents,
} from "../controllers/adminController.js";

const router = express.Router();

router.use(protect);
router.use(adminOnly);

router.get("/stats", getAdminMiniStats);
router.get("/students", getAllStudents);

// COURSE CRUD
router.post("/courses", createCourse);
router.get("/courses", getAllCourses);

router.get("/courses/:courseId", getSingleCourse);
router.put("/courses/:courseId", updateCourse);
router.delete("/courses/:courseId", deleteCourse);

// BATCH
router.post("/courses/:courseId/batches", createBatch);

// ENROLLMENT MANAGEMENT
router.get("/courses/:courseId/students", getCourseStudents);
router.get("/batches/:batchId/students", getBatchStudents);

// ASSIGNMENT REVIEW
router.get("/assignments", getAllAssignments);
router.get("/assignments/pending", getPendingAssignments);
router.patch("/assignments/:assignmentId/review", reviewAssignment);


export default router;
