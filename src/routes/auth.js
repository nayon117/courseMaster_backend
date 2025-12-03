import express from 'express';
import { loginUser, logoutUser, registerStudent } from '../controllers/auth.js';
const router = express.Router();

router.post('/register', registerStudent);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

export default router;
