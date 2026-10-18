import { updateTodo } from '../services/todoService'

const TodoItem = ({ todo, handleTodoUpdate }) => {
    
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
        <div key={todo._id} className='flex gap-2'>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={handleCheckbox} />
            <li className='list-none'>{todo.description}</li>
        </div>
    )
}

export default TodoItem