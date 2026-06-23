const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const http = require("http")
const { Server } = require("socket.io")

const connectDB = require("./config/db")

const authRoutes = require("./routes/authRoutes")
const projectRoutes = require("./routes/projectRoutes")
const taskRoutes = require("./routes/taskRoutes")
const commentRoutes = require("./routes/commentRoutes")

dotenv.config()
connectDB()

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
})

// SOCKET CONNECTION
io.on("connection", (socket) => {
  console.log("User connected:", socket.id)

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id)
  })
})

// Make io available in controllers
app.set("io", io)

// MIDDLEWARE
app.use(cors({
  origin: "*"
}))
app.use(express.json())

// ROUTES
app.use("/api/auth", authRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/tasks", taskRoutes)
app.use("/api/comments", commentRoutes)

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Running")
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})