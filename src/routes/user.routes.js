import { Router } from "express"
import UsersController from "../controllers/usersController.js"

const  userRoutes = Router()
const usersController = new UsersController()

userRoutes.post("/", usersController.create)

export default userRoutes