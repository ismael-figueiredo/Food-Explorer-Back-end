import express from 'express';
import cors from "cors"
import AppError from "./src/utils/AppError.js"
import routes from './src/routes/index.js';
import "express-async-errors";



const app = express()
app.use(cors())
app.use(express.json())


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

const PORT = 3000
// Escute em todos os endereços de rede
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on Port ${PORT}`)
})
