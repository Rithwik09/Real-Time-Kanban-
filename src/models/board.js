import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  description: String
}, { _id: true });

const columnSchema = new mongoose.Schema({
  title: String,
  tasks: [taskSchema]
});

const boardSchema = new mongoose.Schema({
  title: String,
  userId: String,
  columns: [columnSchema]
}, { timestamps: true });

export default mongoose.model("Board", boardSchema);