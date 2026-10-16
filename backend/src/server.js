import dotenv from 'dotenv'
import express from 'express'
import { connectDB } from './config/db.js';

dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000;

app.get('/', (req,res)=>{
    res.send("hello");
})

try {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server is up and running at http://localhost:${PORT}`);
    })
} catch (err) {
    console.error("Failed to start the server", err);
    process.exit(1);
}
