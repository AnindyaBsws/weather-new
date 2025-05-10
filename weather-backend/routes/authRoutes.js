import express from 'express';
import wrapAsync from './../utils/wrapAsync.js';
import { signup, login, logout } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', wrapAsync(signup));
router.post('/login', login);
  
router.post('/logout', logout);

export default router;
