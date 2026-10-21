import { updateTodo } from '../services/todoService'
import { SquarePen, X } from 'lucide-react';

const TodoItem = ({ todo, handleTodoUpdate, handleTodoDelete }) => {

    async function handleCheckbox(e) {
        const prevCompleted = todo.completed;
        const completed = e.target.checked;

        handleTodoUpdate(todo._id, completed);

        try {
            await updateTodo(todo._id, completed);
        } catch (err) {
            console.error("Failed to update todo:", err);

            // roll back the ui
            handleTodoUpdate(todo._id, prevCompleted);
        }
    }

    return (
        <div key={todo._id}
            className='flex w-full items-center gap-2 p-3 bg-white rounded-lg transition-colors hover:bg-gray-50 cursor-pointer'>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={handleCheckbox} />

            <li
                className={`list-none ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                {todo.description}
            </li>

            <button
                className='ml-auto rounded p-1 text-gray-500 hover:bg-gray-100 cursor-pointer'> <SquarePen size={18} />
            </button>

            <button className='rounded p-1 text-red-500 hover:text-red-700 cursor-pointer'
                onClick={(e) => { handleTodoDelete(todo._id) }}
            >
                <X size={18} />
            </button>
        </div>
    )
}

export default TodoItem