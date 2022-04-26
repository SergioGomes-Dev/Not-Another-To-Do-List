import asyncHandler from "express-async-handler";
import List from "../models/listModel.js";

// @desc Fetch all lists
// @route GET /api/lists
// @access Public
const getLists = asyncHandler(async (req, res) => {
  const lists = await List.find({});

  res.json(lists);
});

// @desc Fetch single list
// @route GET /api/lists/:id
// @access Public
const getListById = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (list) {
    res.json(list);
  } else {
    res.status(404);
    throw new Error("List not found");
  }
});

export { getLists, getListById };
