const express = require("express")

const {
  createComment,
  getComments,
  deleteComment,
} = require(
  "../controllers/commentController"
)

const protect = require(
  "../middleware/authMiddleware"
)

const router = express.Router()

// CREATE COMMENT
router.post(
  "/",
  protect,
  createComment
)

// GET COMMENTS OF TASK
router.get(
  "/:taskId",
  protect,
  getComments
)

// DELETE COMMENT
router.delete(
  "/:id",
  protect,
  deleteComment
)

module.exports = router