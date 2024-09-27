import express from 'express';
import TodoController from '../controllers/TodoController.js';
import { authenticateJWT } from '../middlewares/auth.js'; // Adjust the path as necessary

const router = express.Router();

// Public route
router.get('/', (req, res) => {
    return res.send('Hello World');
});

// Protected routes
router.get('/todos', authenticateJWT, TodoController.index);
router.get('/todo/:id', authenticateJWT, TodoController.show);
router.post('/todos', authenticateJWT, TodoController.create);
router.delete('/todo/:id', authenticateJWT, TodoController.destroy);
router.put('/todo/:id/status', authenticateJWT, TodoController.statusUpdate);

export default router;
