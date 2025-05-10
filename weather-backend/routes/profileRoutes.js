import express from 'express';
import wrapAsync from './../utils/wrapAsync.js';
import { isLoggedIn } from '../middleware.js';
import { show, edit } from '../controllers/profileController.js';

const router = express.Router();

router.route('/')
    .get(isLoggedIn, wrapAsync(show))
    .put(isLoggedIn, wrapAsync(edit));
  
export default router;