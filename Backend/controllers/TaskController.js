const { NotFound } = require("../errors");
const Task = require("../models/Task");

const get_tasks = async (req, res, next) => {
  const id = req.user.userId;
  const tasks = await Task.find({ createdBy: id });
  res.status(200).json({ success: true, data: tasks });
};

const get_task = async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) return NotFound("No Task Found");
  res.status(200).json({ success: true, data: task });
};

const create_task = async (req, res, next) => {
  const { title, priority } = req.body;
  const id = req.user.userId;
  const task = await Task.create({
    title,
    priority,
    createdBy: id,
  });
  console.log(task);
  res.status(201).json({ success: true, data: task });
};

const edit_task = async (req, res, next) => {
  const { id } = req.params;
  const newTask = req.body;
  const task = await Task.findByIdAndUpdate(id, newTask, {
    new: true,
    runValidators: true,
  });
  if (!task) return NotFound("No Task Found");
  res.status(200).json({ success: true, data: task });
};

const del_task = async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);
  if (!task) return NotFound("No Task Found");
  res.status(200).json({ success: true, data: task });
};

module.exports = {
  get_task,
  get_tasks,
  create_task,
  edit_task,
  del_task,
};
