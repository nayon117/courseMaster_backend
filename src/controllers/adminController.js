import Batch from "../models/Batch.js";
import Enrollment from "../models/Enrollment.js";
import AssignmentSubmission from "../models/AssignmentSubmission.js";
import Course from "../models/Course.js";
import User from "../models/User.js";

export const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.json({ success: true, course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllCourses = async (req, res) => {
  const courses = await Course.find();
  res.json({ courses });
};

export const getSingleCourse = async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  res.json({ course });
};

export const updateCourse = async (req, res) => {
  const course = await Course.findByIdAndUpdate(
    req.params.courseId,
    req.body,
    { new: true }
  );
  res.json({ course });
};

export const deleteCourse = async (req, res) => {
  await Course.findByIdAndDelete(req.params.courseId);
  res.json({ message: "Course deleted" });
};

// ------------ Batch Management ------------

export const createBatch = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { name, startDate } = req.body;

    const batch = await Batch.create({
      course: courseId,
      name,
      startDate,
    });

    res.json({ success: true, batch });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCourseStudents = async (req, res) => {
  const students = await Enrollment.find({ course: req.params.courseId })
    .populate("student", "name email");

  res.json({ students });
};

export const getBatchStudents = async (req, res) => {
  const students = await Enrollment.find({ batch: req.params.batchId })
    .populate("student", "name email")
    .populate("course", "title");

  res.json({ students });
};

// ------------ Assignment Management ------------

export const getAllAssignments = async (req, res) => {
  const submissions = await AssignmentSubmission.find()
    .populate("student", "name email")
    .populate("course", "title");

  res.json({ submissions });
};

export const reviewAssignment = async (req, res) => {
  const { status, marks } = req.body;

  const result = await AssignmentSubmission.findByIdAndUpdate(
    req.params.assignmentId,
    { status, marks },
    { new: true }
  );

  res.json({ success: true, result });
};

export const getPendingAssignments = async (req, res) => {
  try {
    const pendingAssignments = await AssignmentSubmission.find({
      status: "pending",
    })
      .populate("student", "name email")
      .populate("course", "title")
      .populate("module", "title"); 

    res.json(pendingAssignments);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const getAdminMiniStats = async (req, res) => {
  try {
    const totalCourses = await Course.countDocuments();
    const totalStudents = await User.countDocuments({ role: "student" });
    const pendingAssignments = await AssignmentSubmission.countDocuments({
      status: "pending",
    });

    res.json({
      success: true,
      stats: {
        totalCourses,
        totalStudents,
        pendingAssignments,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" })
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch students" });
  }
};
