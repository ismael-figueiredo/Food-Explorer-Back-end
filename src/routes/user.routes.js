import { Router } from "express"
import UsersController from "../controllers/usersController.js"

const usersController = new UsersController()
const  useRoutes = Router()

useRoutes.get("/", usersController.index)

export default useRoutes