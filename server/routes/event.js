import express from 'express';
import EventController from '../controllers/EventController.js';
import { authenticateJWT } from '../middlewares/auth.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();

router.get('/',authenticateJWT, EventController.index);
router.post('/', authenticateJWT, upload.single('image'), EventController.create);
router.get('/:id',authenticateJWT, EventController.show);
router.put('/:id', authenticateJWT, upload.single('image'), EventController.update);
router.delete('/:id', authenticateJWT, EventController.destroy);

router.get('/:id/invite', EventController.invitationLink);
router.post('/:id/register', EventController.registerAttendee);

export default router;
