import { Router } from "express"
import UsersController from "../controllers/usersController.js"
import ensureAuthenticated from "../middlewares/ensureAuthenticated.js"

const  userRoutes = Router()
const usersController = new UsersController()

userRoutes.post("/", usersController.create)
userRoutes.use(ensureAuthenticated)


export default userRoutes