import cors from 'cors'
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
app.use(cors({ origin: 'http://localhost:5173' })) // configured cors setup
app.use('/todos', todoRoutes)

// sample test route for home
app.get('/', (req, res) => {
    res.send("Todo API is running successfully!");
})

// establishing connection and setting up the server
try {
    await connectDB();

    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is up and running at http://localhost:${PORT}`);
    })
} catch (err) {
    console.error("Failed to start the server", err);
    process.exit(1);
}