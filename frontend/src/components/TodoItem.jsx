import { SquarePen, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { updateTodo } from '../services/todoService'

const TodoItem = ({ todo, handleTodoUpdate, handleTodoDelete, handleSave }) => {

    const editRef = useRef(null);
    const [error, setError] = useState('');
    const [isEdited, setIsEdited] = useState(false);
    const [description, setDescription] = useState(todo.description);

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

    async function handleEditSubmit(id, description) {
        try {
            if (!description.trim()) {
                setError("Description cannot be empty!")
                return;
            } else {
                setError('');
            }
            await handleSave(id, description.trim());
            setIsEdited(false);
        } catch (err) {
            console.error("Something went wrong", err)
        }
    }

    useEffect(() => {
        function handleClickOutside(e) {
            if (editRef.current && !editRef.current.contains(e.target)) {
                setIsEdited(false);
                setError('')
                setDescription(todo.description);
            }
        }

        if (isEdited) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [isEdited, todo.description]);

    return (
        <div key={todo._id}
            className='flex w-full items-center gap-2 p-3 bg-white rounded-lg transition-colors hover:bg-gray-50 cursor-pointer'>
            <input
                className="h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-gray-300 checked:border-blue-600 checked:bg-blue-600 transition-colors"
                type="checkbox"
                checked={todo.completed}
                onChange={handleCheckbox} />

            <li
                className={`list-none ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                {
                    isEdited ?
                        <div
                            className="flex min-w-0 flex-1 flex-col gap-1"
                            ref={editRef}
                        >
                            <div className="flex min-w-0 items-center gap-2">
                                <input
                                    className="min-w-0 flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                        if (e.target.value.trim()) {
                                            setError('');
                                        }
                                    }}
                                    type="text"
                                    value={description}
                                    placeholder='Enter a new description' />
                                <button
                                    className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer"
                                    onClick={() => {
                                        handleEditSubmit(todo._id, description);
                                    }}
                                    type='button'>
                                    Save
                                </button>
                            </div>

                            {error && (
                                <p className="text-xs text-red-500">
                                    {error}
                                </p>
                            )}
                        </div> : todo.description
                }
            </li>

            <button
                className='ml-auto rounded p-1 text-gray-500 hover:bg-gray-100 cursor-pointer'
                onClick={(e) => {
                    if (isEdited) {
                        setIsEdited(false);
                        setError('');
                        setDescription(todo.description);
                    } else {
                        setIsEdited(true);
                        setError('');
                    }
                }}
            > <SquarePen size={18} />
            </button>

            <button
                className='rounded p-1 text-red-500 hover:text-red-700 cursor-pointer'
                onClick={(e) => { handleTodoDelete(todo._id) }}
            >
                <X size={18} />
            </button>
        </div>
    )
}

export default TodoItem