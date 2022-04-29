import asyncHandler from "express-async-handler";
import List from "../models/listModel.js";

// @desc    Fetch a single item
// @route   GET /api/lists/:id/:itemid
// @access  Private
const getItemById = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  const item = list.content.id(req.params.itemid);

  if (item) {
    if (list.user.toString() === req.user._id.toString()) {
      res.json(item);
    } else {
      res.status(404);
      throw new Error("Incorrect User, Not Authorized.");
    }
  } else {
    res.status(404);
    throw new Error("Not Found" + req.params.itemid);
  }
});

export { getItemById };
