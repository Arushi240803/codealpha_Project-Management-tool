const Comment = require("../models/Comment")
const Task = require("../models/Task")

// CREATE COMMENT
const createComment = async (
  req,
  res
) => {
  try {
    const { text, taskId } = req.body

    // CHECK TASK EXISTS
    const task = await Task.findById(
      taskId
    )

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      })
    }

    // CREATE COMMENT
    const comment =
      await Comment.create({
        text,
        task: taskId,
        user: req.user,
      })

    // POPULATE USER NAME
    const populatedComment =
      await Comment.findById(
        comment._id
      ).populate("user", "name email")

    res
      .status(201)
      .json(populatedComment)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

// GET COMMENTS
const getComments = async (
  req,
  res
) => {
  try {
    const comments =
      await Comment.find({
        task: req.params.taskId,
      }).populate(
        "user",
        "name email"
      )

    res.status(200).json(comments)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

// DELETE COMMENT
const deleteComment = async (
  req,
  res
) => {
  try {
    const comment =
      await Comment.findById(
        req.params.id
      )

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      })
    }

    await comment.deleteOne()

    res.status(200).json({
      message: "Comment deleted",
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

module.exports = {
  createComment,
  getComments,
  deleteComment,
}