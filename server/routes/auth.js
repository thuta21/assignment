import express from 'express';
import authController from '../controllers/AuthController.js';

const router = express.Router();

// Route to register a new user
router.post('/register',authController.register);

// Route to login a user
router.post('/login', authController.login);

export default router;
