import express from 'express';
import { authenticateJWT } from '../middlewares/auth.js';
import OrganizerController from '../controllers/OrganizerController.js';

const router = express.Router();

router.get('/',authenticateJWT, OrganizerController.index);

export default router;
