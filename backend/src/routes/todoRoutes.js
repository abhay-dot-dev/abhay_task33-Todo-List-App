import express from 'express';
import validateTodo from '../middleware/validateTodo.js';
import { todoSchema, patchTodoSchema } from '../validators/todoValidator.js';
import { addTodo, getTodo, deleteTodoById, updateTodoFields } from '../controllers/todoController.js';

const router = express.Router();

// routes
router.get('/', getTodo)

router.post('/', validateTodo(todoSchema), addTodo);

router.patch('/:id', validateTodo(patchTodoSchema), updateTodoFields)

router.delete('/:id', deleteTodoById)

export default router;