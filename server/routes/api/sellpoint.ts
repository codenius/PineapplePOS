import { Router } from "express"
import Authenticator from "../../auth/authenticator"
import sellpointController from "../../controllers/api/sellpointController"

const sellpointRouter = Router()

sellpointRouter.post("/sell", [
    (req, res, next) => Authenticator.sell(req, res, next),
    (req, res, next) => sellpointController.create.all(req, res, next) 
])

export default sellpointRouter