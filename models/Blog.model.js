const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  taskname: String,
  status: { type: String, enum: ["pending", "done"] },
  tag: { type: String,enum:["personal", "official", "family"] },
  author_id: String,
});

const Todomodel = mongoose.model("todo", todoSchema);

module.exports = { Todomodel };
