import express from 'express';
import validateTodo from '../middleware/validateTodo.js';
import { todoSchema,patchTodoSchema } from '../validators/todoValidator.js';
import { addTodo, deleteTodoById, getTodo, getTodoById, updateTodoById, updateTodoFields } from '../controllers/todoController.js';

const router = express.Router();

// routes
router.get('/', getTodo)
router.get('/:id', getTodoById)

router.post('/', validateTodo(todoSchema), addTodo);

router.put('/:id', updateTodoById)
router.patch('/:id',validateTodo(patchTodoSchema) ,updateTodoFields)

router.delete('/:id', deleteTodoById)

export default router;