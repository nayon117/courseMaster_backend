import Course from "../models/Course.js";

export const getCourses = async (req, res, next) => {
  try {
    const { search, category, sort, page = 1, limit = 10 } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { instructor: { $regex: search, $options: "i" } },
      ];
    }

    if (category) query.category = category;

    let sortOption = {};
    if (sort === "price_asc") sortOption.price = 1;
    if (sort === "price_desc") sortOption.price = -1;

    const courses = await Course.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Course.countDocuments(query);

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: courses,
    });
  } catch (err) {
    next(err);
  }
};

export const getCourseDetails = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json({ success: true, data: course });
  } catch (err) {
    next(err);
  }
};
