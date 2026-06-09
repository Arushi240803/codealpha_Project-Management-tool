const Task = require("../models/Task")
const Project = require("../models/Project")

// CREATE TASK
const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      projectId,
      assignedTo,
    } = req.body

    // CHECK PROJECT EXISTS
    const project = await Project.findById(
      projectId
    )

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      })
    }

    // CHECK USER IS PROJECT MEMBER
    if (
      !project.members.includes(req.user)
    ) {
      return res.status(401).json({
        message: "Not authorized",
      })
    }

    // CREATE TASK
    const task = await Task.create({
      title,
      description,
      project: projectId,
      assignedTo,
    })

    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

// GET TASKS BY PROJECT
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      project: req.params.projectId,
    }).populate("assignedTo", "name email")

    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

// UPDATE TASK STATUS
const updateTaskStatus = async (
  req,
  res
) => {
  try {
    const task = await Task.findById(
      req.params.id
    ).populate(
      "assignedTo",
      "name email"
    )

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      })
    }

    task.status = req.body.status

    await task.save()

    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

// DELETE TASK
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(
      req.params.id
    )

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      })
    }

    await task.deleteOne()

    res.status(200).json({
      message: "Task deleted",
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
}