import asyncHandler from "express-async-handler";
import List from "../models/listModel.js";

// @desc    Fetch all user lists
// @route   GET /api/lists
// @access  Private
const getLists = asyncHandler(async (req, res) => {
  const lists = await List.find({ user: req.user });

  res.json(lists);
});

// @desc    Fetch single list
// @route   GET /api/lists/:id
// @access  Private
const getListById = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (list.user.toString() === req.user._id.toString()) {
    if (list) {
      res.json(list);
    } else {
      res.status(404);
      throw new Error("List not found");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, Incorrect User");
  }
});

export { getLists, getListById };
