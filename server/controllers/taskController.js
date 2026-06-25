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
    const project = await Project.findById(projectId)

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      })
    }

    // CHECK USER ACCESS
    const isOwner =
      project.owner.toString() === req.user.toString()

    const isMember = project.members.some(
      (member) =>
        member.toString() === req.user.toString()
    )

    if (!isOwner && !isMember) {
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

    const populatedTask = await Task.findById(task._id)
      .populate("assignedTo", "name email")

    // REALTIME EVENT
    const io = req.app.get("io")
    io.emit("taskCreated", populatedTask)

    res.status(201).json(populatedTask)

  } catch (error) {
    console.log("CREATE TASK ERROR:", error)
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
    console.log("GET TASKS ERROR:", error)
    res.status(500).json({
      message: error.message,
    })
  }
}

// UPDATE TASK STATUS
const updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      })
    }

    task.status = req.body.status
    await task.save()

    const updatedTask = await Task.findById(task._id)
      .populate("assignedTo", "name email")

    // REALTIME EVENT
    const io = req.app.get("io")
    io.emit("taskUpdated", updatedTask)

    res.status(200).json(updatedTask)

  } catch (error) {
    console.log("UPDATE TASK ERROR:", error)
    res.status(500).json({
      message: error.message,
    })
  }
}

// DELETE TASK
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      })
    }

    const taskId = task._id
    const projectId = task.project

    await task.deleteOne()

    // REALTIME EVENT
    const io = req.app.get("io")
    io.emit("taskDeleted", {
      taskId,
      projectId,
    })

    res.status(200).json({
      message: "Task deleted",
    })

  } catch (error) {
    console.log("DELETE TASK ERROR:", error)
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