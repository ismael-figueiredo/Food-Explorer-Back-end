import { Router } from "express"
import userRoutes from "./user.routes.js"
import dishRoutes from "./dish.routes.js"
import sessionRoutes from "./session.routes.js"
import ensureAuthenticated from "../middlewares/ensureAuthenticated.js"

const routes = Router()

routes.use("/session",sessionRoutes)
routes.use("/users", userRoutes)
//routes.use(ensureAuthenticated)
routes.use("/dish", dishRoutes)

export default routes
