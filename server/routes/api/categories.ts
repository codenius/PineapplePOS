import { Router } from "express"
import Authenticator from "../../auth/authenticator"
import {CategoryController, CategorySelectController} from "../../controllers/api/categoryController"
import CategoryModel from "../../types/api/category"
import itemController from "../../controllers/api/itemController"
import itemModel from "../../types/api/item"

const categoriesRouter = Router()

categoriesRouter.get("/", [
    (req, res, next) => Authenticator.read(req, res, next),
    (req, res, next) => CategorySelectController.all(req, res, next)
])

categoriesRouter.get("/:id", [
    (req, res, next) => Authenticator.read(req, res, next),
    (req, res, next) => CategoryController.select.single(req, res, next)
])

export default categoriesRouter