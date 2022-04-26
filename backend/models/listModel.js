import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      default: "",
    },
    completed: {
      type: Boolean,
      default: false,
      required: true,
    },
    priority: {
      type: String,
      default: "None",
    },
    deadline: {
      type: String,
      default: "",
    },
    recurring: {
      type: Boolean,
      default: false,
    },
    repeats: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const listSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    content: [itemSchema],
  },
  {
    timestamps: true,
  }
);

const List = mongoose.model("List", listSchema);

export default List;
