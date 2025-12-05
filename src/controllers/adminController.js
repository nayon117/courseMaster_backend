import Batch from "../models/Batch.js";
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import User from "../models/User.js";
import StudentCourse from "../models/StudentCourse.js";

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
  res.json( {courses} );
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
// GET all assignment submissions
export const getAllAssignments = async (req, res) => {
  try {
    const submissions = await StudentCourse.find()
      .populate("studentId", "name email")
      .populate("courseId", "title");

    const result = [];
    submissions.forEach(sc => {
      sc.progress.forEach(progress => {
        if (progress.assignment) {
          result.push({
            _id: progress._id,           
            lessonId: progress.lessonId,
            studentCourseId: sc._id,
            student: sc.studentId,
            course: sc.courseId,
            assignment: progress.assignment,
            marks: progress.marks ?? 0
          });
        }
      });
    });

    res.json({ submissions: result });
  } catch (err) {
    console.error("Error fetching assignments:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


// PATCH review and mark an assignment
export const reviewAssignment = async (req, res) => {
  const { marks } = req.body;
  const { assignmentId } = req.params; 

  try {
    if (!mongoose.Types.ObjectId.isValid(assignmentId))
      throw new Error("Invalid assignmentId");

    const studentCourse = await StudentCourse.findOne({ "progress._id": assignmentId });
    if (!studentCourse) throw new Error("StudentCourse not found");

    const lesson = studentCourse.progress.id(assignmentId);
    if (!lesson) throw new Error("Lesson not found");

    lesson.marks = marks; 
    await studentCourse.save();

    res.json({ success: true, lesson });
  } catch (err) {
    console.error("Error updating assignment marks:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};



export const getAdminMiniStats = async (req, res) => {
  try {
    const totalCourses = await Course.countDocuments();
    const totalStudents = await User.countDocuments({ role: "student" });

    // Count total assignments in all courses
    const courses = await Course.find({}, "syllabus");
    let totalAssignments = 0;

    courses.forEach(course => {
      course.syllabus.forEach(lesson => {
        if (lesson.assignments) {
          totalAssignments += lesson.assignments.length;
        }
      });
    });

    res.json({
      success: true,
      stats: {
        totalCourses,
        totalStudents,
        totalAssignments,
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

// 2️⃣ Get students enrolled in a course
export const getStudentsByCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    // Find all studentCourse documents with the selected course
    const studentCourses = await StudentCourse.find({ courseId })
      .populate("studentId", "name email"); // get student details

    const students = studentCourses.map(sc => sc.studentId); // array of students
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch students for this course" });
  }
};

