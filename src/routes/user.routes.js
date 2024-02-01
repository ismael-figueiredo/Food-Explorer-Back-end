import { Router } from "express"
import UsersController from "../controllers/usersController.js"

const usersController = new UsersController()
const  useRoutes = Router()

useRoutes.get("/", usersController.create)

export default useRoutes