import express from 'express'
import TodoController from '../controllers/TodoController.js';

const router = express.Router()

router.get('/', (req, res) => {
	return res.send('Hello World')
});

router.get('/todos', TodoController.index);

router.get('/todo/:id', TodoController.show);

router.post('/todos', TodoController.create);

router.delete('/todo/:id', TodoController.destroy);

router.put('/todo/:id/status', TodoController.statusUpdate);

export default router
