import mongoose from "mongoose";

const Schema = mongoose.Schema;

const toDoSchema = new Schema({
  text: {
      type: String,
      required: true
  },
  isCompleted: {
      type: Boolean,
      required: true
  }
})

export default mongoose.model("ToDo", toDoSchema, "toDo")