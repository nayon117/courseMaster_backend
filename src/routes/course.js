import express from "express";
import { getCourseDetails, getCourses } from "../controllers/course.js";
import Course from "../models/Course.js";
const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourseDetails);
router.post("/seed", async (req, res) => {
  try {
    await Course.insertMany(req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
