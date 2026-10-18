import { useState } from 'react'
import { addTodo } from '../services/todoService.js';

const TodoForm = () => {

    const [task, setTask] = useState('');

    function handleTask(value) {
        setTask(value)
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!task.trim()) {
            return;
        }
        try{
            await addTodo(task);
            setTask("")
        } catch (err) {
            console.error(err);
        }    
    }

    return (
        <div className="w-full max-w-xl mx-auto">
            <div className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm border border-gray-200">
                <input
                    value={task}
                    onChange={(e) => { handleTask(e.target.value) }}
                    className="flex-1 min-w-0 bg-transparent px-3 py-2 outline-none text-gray-700 placeholder-gray-400"
                    type="text"
                    required
                    placeholder="Add a new task..."
                />

                <button
                    onClick={handleSubmit}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-2xl font-medium text-white transition hover:bg-blue-700 cursor-pointer"
                    type="button"
                    aria-label="Add task"
                >
                    +
                </button>
            </div>
        </div>
    )
}

export default TodoForm