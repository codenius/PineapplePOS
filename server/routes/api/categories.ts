import { Router } from "express"
import Authenticator from "../../auth/authenticator"
import CategoryController from "../../controllers/api/categoryController"

const categoriesRouter = Router()

categoriesRouter.get("/", [
    (req, res, next) => Authenticator.read(req, res, next),
    (req, res, next) => CategoryController.select.all(req, res, next)
])

categoriesRouter.get("/:id", [
    (req, res, next) => Authenticator.read(req, res, next),
    (req, res, next) => CategoryController.select.single(req, res, next)
])

export default categoriesRouter