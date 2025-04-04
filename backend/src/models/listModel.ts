import { Schema, model, Document, Types } from "mongoose";

export interface IList extends Document {
  name: string;
  userId: Types.ObjectId;
  canDelete: boolean;
  createdAt: Date;
}

const listSchema = new Schema<IList>(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    canDelete: {
      type: Boolean,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "Lists",
    timestamps: true,
    strict: true,
    validateBeforeSave: true,
  }
);

const List = model<IList>("List", listSchema);

export default List;
