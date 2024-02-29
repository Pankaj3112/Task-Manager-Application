const { Task } = require("../db");
const dotenv = require("dotenv").config();

const getTasks = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const tasks = await Task.find({
      user: req.user.id,
    })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    return res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

const createTask = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;

  if (!title || !description) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter all fields." });
  }

  try {
    const newTask = await Task.create({ title, description, user: userId });
    return res.status(201).json({ success: true, task: newTask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

const updateTask = async (req, res) => {
  const { title, description, status } = req.body;
  const taskId = req.params.id;

  const validStatus = ["To Do", "In Progress", "Done"];

  if (!title || !description || !status) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter all fields." });
  }

  if (!validStatus.includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status." });
  }

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, user: req.user.id },
      { title, description, status },
      { new: true }
    );
    return res.status(200).json({ success: true, task: updatedTask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

const deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    await Task.findOneAndDelete({ _id: taskId, user: req.user.id });
    return res.status(200).json({ success: true, message: "Task deleted." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
