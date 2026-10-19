import { useState, useEffect } from 'react'

import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import { getTodos } from './services/todoService'


function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    async function fetchTodo() {
      try {
        const response = await getTodos();
        setTodos(response.data.Todos);
      } catch (err) {
        console.error(err)
      }
    }

    fetchTodo();
  }, [])

  function handleTodoUpdate(id, completed) {
    setTodos((prevTodo) =>
      prevTodo.map((todo) =>
        todo._id === id ? { ...todo, completed: completed } : todo
      )
    )
  }

  function handleTodoAdded(newTodo) {
    setTodos((prevTodo) => [...prevTodo, newTodo]);
  }

  return (
    <>

      <h1 className="mt-12 mb-6 flex items-center justify-center gap-3 text-4xl font-bold text-gray-800">
        Plan It. Do It. Done ✨
      </h1>
      <TodoForm handleTodoAdded={handleTodoAdded} />

      <div className='w-full max-w-xl mx-auto mt-4 space-y-2 shadow-md rounded-lg'>
        {
          todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              handleTodoUpdate={handleTodoUpdate} />
          ))
        }
      </div>
    </>
  )
}

export default App
