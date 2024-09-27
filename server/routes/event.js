import express from 'express';
import EventController from '../controllers/EventController.js';
import { authenticateJWT } from '../middlewares/auth.js';
import { upload } from '../middlewares/multer.js';  // Import the multer configuration

const router = express.Router();

router.get('/events',authenticateJWT, EventController.index);
router.post('/events', authenticateJWT, upload.single('image'), EventController.create);
router.get('/event/:id',authenticateJWT, EventController.show);
router.put('/event/:id', authenticateJWT, upload.single('image'), EventController.update);
router.delete('/event/:id', authenticateJWT, EventController.destroy);

export default router;
