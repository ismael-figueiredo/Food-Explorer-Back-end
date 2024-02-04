import { Router } from "express"
import multer from "multer"
import uploadConfig from "../configs/upload.js"
import DishController from "../controllers/dishController.js"
import verifyUserAuthorization from "../middlewares/verifyUserAuthorization.js"

const upload = multer(uploadConfig.MULTER)

const dishRoutes = Router()
const dishController = new DishController()

dishRoutes.post(
  "/",
  verifyUserAuthorization(["admin"]),
  upload.single("image"),
  dishController.create
)

export default dishRoutes
