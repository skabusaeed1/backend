const express = require("express");

const { Todomodel } = require("../models/Blog.model");
const todoRouter = express.Router();

todoRouter.get("/", async (req, res) => {
  const { status, tag } = req.query;
  var todos = await Todomodel.find();
  if (status) {
    todos = todos.filter((todo) => todo.status === status);
  }
  if (tag) {
    todos = todos.filter((todo) => todo.todo.tag === tag);
  }
  res.send(todos);
});

todoRouter.post("/create", async (req, res) => {
  const { taskname, status, tag } = req.body;
  const author_id = req.userID;
  const todo = new Todomodel({
    taskname,
    status,
    tag,
    author_id,
  });
  await todo.save();
  res.status(201).send({ msg: "Todo created successfully" });
});

todoRouter.put("/put/:todoID", async (req, res) => {
  const { todoID } = req.params;
  const updatedTodo = req.body;

  const userID = req.userID;
  const todo1 = await Todomodel.findOne({ _id: todoID });
  // const author_id = todo1.author_id;
  if (todo1.author_id === userID) {
    const todo = await Todomodel.findByIdAndUpdate(todoID, req.body);
    res.send({ msg: "Data updated successfully" });
  }

});

todoRouter.delete("/delete/:todoID", async (req, res) => {
  const { todoID } = req.params;
  const userID = req.userID; 
  const todo = await Todomodel.findOne({ _id: todoID });
  const author_id = todo.author_id; 

  if (author_id === userID) {
    await Todomodel.findOneAndDelete({ _id: todoID });
    res.send({ msg: "Todo deleted successfully" });
  } else {
    res.send({ msg: "You are not authorised to do this" });
  }
});

module.exports = { todoRouter };
