import "dotenv/config.js"
import "express-async-errors"
import express from "express"
import AppError from "./utils/AppError.js"
import cors from "cors"
import routes from "./routes/index.js"
import upload from "./configs/upload.js"

const app = express()
app.use(cors())
app.use(express.json())

app.use("/files", express.static(upload.UPLOADS_FOLDER))
app.use(routes)

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    })
  }

  console.error(error)

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  })
})

const PORT = process.env.SERVER_PORT

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on Port ${PORT}`)
})
