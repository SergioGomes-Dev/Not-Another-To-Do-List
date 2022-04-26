import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import lists from "./data/sampleLists.js";

dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/lists", (req, res) => {
  res.json(lists);
});

app.get("/api/lists/:id", (req, res) => {
  const list = lists.find((p) => p._id === req.params.id);
  res.json(list);
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
