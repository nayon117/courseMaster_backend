import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import errorHandler from './src/middlewares/error.js';
import authRoutes from './src/routes/auth.js';
import courseRoutes from './src/routes/course.js';
import studentRoutes from './src/routes/student.js';
import adminRoutes from './src/routes/admin.js'
import connectDB from './src/config/db.js';

const app = express();

// middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true, 
  })
);
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/admin", adminRoutes);

// error handler
app.use(errorHandler);

// test route
app.get('/', (req, res) => {
  res.send('CourseMaster API is running');
});

// connect db and start server
const start = async () => {
  await connectDB();
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
};

start();
