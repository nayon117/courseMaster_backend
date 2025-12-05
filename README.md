# Course Master - Backend

## Description
This is the backend for Course Master, a student/course management system.  
It provides APIs for managing students, courses, assignments, and enrollment, along with authentication and admin features.

## Installation / Run Instructions

1. Clone the repository:
```bash
git clone <https://github.com/nayon117/courseMaster_backend>
cd backend
npm install
---- env ---
MONGO_URI=your_mongo_uri
PORT=your_port
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=your_client_url
ADMIN_KEY=admin_key

node index.js

## API Documentation

### Auth
- **Admin / User Authentication**  
  Endpoints for login/register depending on your auth setup.

### Students
- **Get all students**  
  `GET /admin/students`  
  Returns a list of all students.

- **Get students by course**  
  `GET /admin/courses/:courseId/students`  
  Returns a list of students enrolled in the selected course.

### Courses
- **Get all courses**  
  `GET /admin/courses`  
  Returns a list of all available courses.

- **Get single course**  
  `GET /admin/courses/:courseId`  
  Returns details of a single course.

- **Create course**  
  `POST /admin/courses`  
  Create a new course. Request body should include course details.

- **Update course**  
  `PUT /admin/courses/:courseId`  
  Update a course’s information.

- **Delete course**  
  `DELETE /admin/courses/:courseId`  
  Delete a course from the system.


### Assignments
- **Get all assignments**  
  `GET /admin/assignments`  
  Returns all submitted assignments with student and course info.


- For any issue contact : hasibul.nayon1@gmail.com
