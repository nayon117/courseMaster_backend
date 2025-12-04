import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import errorHandler from './middlewares/error.js';
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/course.js';
import studentRoutes from './routes/student.js';
import adminRoutes from './routes/admin.js';

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
