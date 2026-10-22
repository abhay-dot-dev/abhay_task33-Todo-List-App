import Todo from "../models/Todo.js";

export async function addTodo(req, res) {
    try {
        const { description, completed } = req.body;
        const todo = new Todo({
            description,
            completed
        });

        // waiting for the task to get saved in DB
        await todo.save();
        res.status(201).json({ message: "Task added successfully", todo })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export async function getTodo(req, res) {
    try {
        const todos = await Todo.find();
        res.status(200).json({ Todos: todos });
    } catch (err) {
        res.status(500).json({ message: [] });
    }
}

export async function deleteTodoById(req, res) {
    const { id } = req.params;

    try {
        if (!Todo.base.isValidObjectId(id)) {
            res.status(400).json({ message: "Invalid Todo ID" });
            return;
        }
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            res.status(404).json({ message: "Todo not found" });
            return;
        }
        res.status(200).json({ message: "Todo deleted successfully", todo: todo });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function updateTodoFields(req, res) {
    const { id } = req.params;
    const { description, completed } = req.body;
    const updates = {};

    if (description !== undefined) updates.description = description;
    if (completed !== undefined) updates.completed = completed;

    try {
        if (!Todo.base.isValidObjectId(id)) {
            res.status(400).json({ message: "Invalid Todo ID" });
            return;
        }

        if (Object.keys(updates).length === 0) {
            res.status(400).json({ message: "No fields provided to update" });
            return;
        }

        const todo = await Todo.findByIdAndUpdate(
            id,
            updates,
            { returnDocument: "after", runValidators: true });

        if (!todo) {
            res.status(404).json({ message: "Todo not found" });
            return;
        }
        res.status(200).json({ todo: todo });
    } catch (err) {
        if (err.name === "ValidationError") {
            res.status(400).json({ message: "Validation failed" });
            return;
        }
        res.status(500).json({ message: err.message });
    }
}