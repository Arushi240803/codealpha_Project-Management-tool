const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    // TODO / IN PROGRESS / DONE
    status: {
      type: String,
      enum: [
        "Todo",
        "In Progress",
        "Done",
      ],
      default: "Todo",
    },

    // WHICH PROJECT TASK BELONGS TO
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    // ASSIGNED USER
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model(
  "Task",
  taskSchema
)