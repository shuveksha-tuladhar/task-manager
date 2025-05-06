import { Schema, model, Document, Types } from "mongoose";

interface Step {
  title: string;
  completed: boolean;
}
export interface ITask extends Document {
  title: string;
  listId: Types.ObjectId;
  userId: Types.ObjectId;
  assignedTo: Types.ObjectId[];
  completed: boolean;
  priority?: "low" | "medium" | "high";
  steps?: Step[];
  isStarred?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const stepSchema = new Schema<Step>(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
);


const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
    },
    listId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "List",
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    assignedTo: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    isStarred: {
      type: Boolean,
      default: false,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    steps: {
      type: [stepSchema],
      required: false,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "Tasks",
    timestamps: true,
    strict: true,
    validateBeforeSave: true,
  }
);

const Task = model<ITask>("Task", taskSchema);

export default Task;
