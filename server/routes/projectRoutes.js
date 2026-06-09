const express = require("express")

const {
  createProject,
  getProjects,
  deleteProject,
  addMember,
} = require("../controllers/projectController")

const protect = require("../middleware/authMiddleware")

const router = express.Router()

// CREATE PROJECT
router.post("/", protect, createProject)

// GET PROJECTS
router.get("/", protect, getProjects)

// DELETE PROJECT
router.delete("/:id", protect, deleteProject)

// ADD MEMBER
router.put(
  "/:id/add-member",
  protect,
  addMember
)

module.exports = router