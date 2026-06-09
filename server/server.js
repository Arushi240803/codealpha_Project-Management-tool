const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

const connectDB = require("./config/db")

const authRoutes = require("./routes/authRoutes")
const projectRoutes = require("./routes/projectRoutes")
const taskRoutes = require("./routes/taskRoutes")
const commentRoutes = require(
  "./routes/commentRoutes"
)

dotenv.config()

connectDB()

const app = express()

// MIDDLEWARE
app.use(cors())
app.use(express.json())

// ROUTES
app.use("/api/auth", authRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/tasks", taskRoutes)
app.use(
  "/api/comments",
  commentRoutes
)

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Running")
})

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})