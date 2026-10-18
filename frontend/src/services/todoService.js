import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/todos'
});

export const addTodo = (task) => {
    return api.post('/', {
        description: task,
        completed: false
    })
}

export const getTodos = () => {
    return api.get('/')
}

export const updateTodo = (id, completed) => {
    return api.patch(`/${id}`, {
        completed: completed
    })
}


export default api;