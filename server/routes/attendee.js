import express from 'express';
import { authenticateJWT } from '../middlewares/auth.js';
import AttendeeController from '../controllers/AttendeeController.js';

const router = express.Router();

router.get('/',authenticateJWT, AttendeeController.index);

export default router;
