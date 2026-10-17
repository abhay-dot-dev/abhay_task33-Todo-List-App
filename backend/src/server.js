import dotenv from 'dotenv'
import express from 'express'
import { connectDB } from './config/db.js';
import todoRoutes from './routes/todoRoutes.js'

// loads the env variables from .env
dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json())
app.use('/todos', todoRoutes)

// sample test route for home
app.get('/', (req, res) => {
    res.send("hello");
})

// establishing connection an d setting up the server
try {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server is up and running at http://localhost:${PORT}`);
    })
} catch (err) {
    console.error("Failed to start the server", err);
    process.exit(1);
}