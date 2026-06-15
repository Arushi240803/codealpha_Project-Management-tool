const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log("MongoDB Connected")
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message)

    // Stop server if DB fails (important for production)
    process.exit(1)
  }
}

module.exports = connectDB