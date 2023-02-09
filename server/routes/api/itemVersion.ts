import { Router } from "express";
import Authenticator from "../../auth/authenticator";
import itemVersioningController from "../../controllers/api/itemVersioningController";
import validate from "../../types/validator";
import { Types } from "mongoose";

let itemVersionRouter = Router()

itemVersionRouter.get("/", [
    (req, res, next) => Authenticator.read(req, res, next),
    (req, res, next) => itemVersioningController.select.all(req, res, next)
])

itemVersionRouter.get("/:version", [
    (req, res, next) => Authenticator.read(req, res, next),
    (req, res, next) => {
        validate(Number, req.params.version)
        req.body["_id._version"] = Number(req.params.version)
        next()
    },
    (req, res, next) => itemVersioningController.select.all(req, res, next)
])

export default itemVersionRouter