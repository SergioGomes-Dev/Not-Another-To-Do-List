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

// @desc   Create a list
// @route  POST /api/lists
// @access Private
const addList = asyncHandler(async (req, res) => {
  //Get Name from input
  let { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("No Title Entered");
  }

  //If only empty space
  if (name.replace(/ /g, "").length === 0) {
    res.status(400);
    throw new Error("Title cannot be empty");
  }

  const newList = await List.create({
    user: req.user._id,
    name: name,
  });

  await newList.save();
  res.json("List Created");
});

export { getLists, getListById, addList };
