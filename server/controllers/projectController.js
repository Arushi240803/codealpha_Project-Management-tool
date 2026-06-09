const Project = require("../models/Project")
const User = require("../models/User")

// CREATE PROJECT
const createProject = async (req, res) => {
  try {
    const { title, description } = req.body

    const project = await Project.create({
      title,
      description,
      owner: req.user,

      // OWNER AUTOMATICALLY MEMBER
      members: [req.user],
    })

    res.status(201).json(project)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

// GET PROJECTS
const getProjects = async (req, res) => {
  try {
    // SHOW PROJECTS WHERE USER IS MEMBER
    const projects = await Project.find({
      members: req.user,
    })
      .populate("members", "name email")
      .populate("owner", "name email")

    res.status(200).json(projects)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

// DELETE PROJECT
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user,
    })

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      })
    }

    await project.deleteOne()

    res.status(200).json({
      message: "Project deleted",
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

// ADD MEMBER
const addMember = async (req, res) => {
  try {
    const { email } = req.body

    // FIND USER
    const user = await User.findOne({
      email,
    })

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      })
    }

    // FIND PROJECT
    const project = await Project.findById(
      req.params.id
    )

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      })
    }

    // CHECK DUPLICATE MEMBER
    if (
      project.members.includes(user._id)
    ) {
      return res.status(400).json({
        message: "User already member",
      })
    }

    // ADD MEMBER
    project.members.push(user._id)

    await project.save()

    res.status(200).json({
      message: "Member added",
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

module.exports = {
  createProject,
  getProjects,
  deleteProject,
  addMember,
}