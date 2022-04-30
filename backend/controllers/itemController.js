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
    throw new Error("Item Not Found");
  }
});

// @desc   Create a Item
// @route  POST /api/lists/:id/item
// @access Private
const addItem = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const list = await List.findById(req.params.id);

  // Check Max Number of Items
  const allItems = list.content;
  if (allItems.length >= 20) {
    throw new Error("You Have Reached the Maximum Items Allowed for This List");
  }

  if (!title) {
    res.status(400);
    throw new Error("No Title Entered");
  }

  //If only empty space
  if (title.replace(/ /g, "").length === 0) {
    res.status(400);
    throw new Error("Title Cannot Be Empty");
  }

  if (list) {
    if (list.user.toString() === req.user._id.toString()) {
      const newItem = await List.findByIdAndUpdate(req.params.id, {
        $push: {
          content: {
            item: title,
          },
        },
      });

      await newItem.save();
      res.json("Item Created");
    } else {
      res.status(404);
      throw new Error("Incorrect User, Not Authorized.");
    }
  } else {
    res.status(404);
    throw new Error("Cannot Create Item Here");
  }
});

// @desc   Delete an Item by ID
// @route  DELETE /api/lists/:id/:itemid
// @access Private
const deleteItem = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (list) {
    if (list.user.toString() === req.user._id.toString()) {
      list.content.id(req.params.itemid).remove();

      await list.save();

      res.json("Item has been removed");
    } else {
      res.status(404);
      throw new Error("Incorrect User, Not Authorized.");
    }
  } else {
    res.status(404);
    throw new Error("Cannot Delete Item Here");
  }
});

// @desc   Edit an item
// @route  PUT /api/lists/:id/:itemid
// @access Private
const editItem = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);
  const item = list.content.id(req.params.itemid);

  if (!req.body.title) {
    res.status(400);
    throw new Error("No Title Entered");
  }

  //If only empty space
  if (req.body.title.replace(/ /g, "").length === 0) {
    res.status(400);
    throw new Error("Title Cannot Be Empty");
  }

  if (list) {
    if (list.user.toString() === req.user._id.toString()) {
      item.item = req.body.title || item.item;
      item.notes = req.body.notes || item.notes;
      item.priority = req.body.priority || item.priority;
      item.deadline = req.body.deadline || item.deadline;
      item.recurring = req.body.recurring || item.recurring;
      item.repeats = req.body.repeats || item.repeats;

      await list.save();

      res.json("Item has been updated");
    } else {
      res.status(404);
      throw new Error("Incorrect User, Not Authorized.");
    }
  } else {
    res.status(404);
    throw new Error("List Not Found");
  }
});

// @desc   Toggle completed for an item
// @route  PUT /api/lists/:id/:itemid/check
// @access Private
const toggleCheckItem = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);
  const item = list.content.id(req.params.itemid);

  if (list) {
    if (list.user.toString() === req.user._id.toString()) {
      if (item.completed === true) {
        item.completed = false;
      } else {
        item.completed = true;
      }
      await list.save();

      res.json("Item Completed has been updated");
    } else {
      res.status(404);
      throw new Error("Incorrect User, Not Authorized");
    }
  } else {
    res.status(404);
    throw new Error("List Not Found");
  }
});

export { getItemById, addItem, deleteItem, editItem, toggleCheckItem };
