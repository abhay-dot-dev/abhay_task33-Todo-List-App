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

  return (
    <>
      <TodoForm />
      {
        todos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} handleTodoUpdate={handleTodoUpdate} />
        ))
      }
    </>
  )
}

export default App
