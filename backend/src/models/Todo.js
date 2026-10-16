import mongoose from "mongoose";

// this refres to how the data will be stored in DB
const todoSchema = new mongoose.Schema({
    description: { type: String, required: true },
    completed: {type:Boolean, default:false}
}, { timestamps: true })

export default mongoose.model("Todo", todoSchema)