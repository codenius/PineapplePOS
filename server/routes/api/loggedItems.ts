import loggedItemController from "../../controllers/api/loggedItemController";
import {Router} from "express";
import Authenticator from "../../auth/authenticator";

const loggedItemRouter = Router()

/* Logged Item Router paths using the LoggedItemController */

/** 
 * * Docs: https://github.com/DoctorFuchs/POS/blob/master/docs/api.md#logged-items
 */

loggedItemRouter.get('/', [
    (req,res,next)=>Authenticator.read(req,res,next),
    (req,res)=>LoggedItemController.get(req,res)
])
loggedItemRouter.get('/:id:', [
    (req,res,next)=>Authenticator.read(req,res,next),
    (req,res)=>LoggedItemController.getSingle(req,res)
])


loggedItemRouter.get('', [Authenticator.read, loggedItemController.get])
loggedItemRouter.get(':id:', [Authenticator.read, loggedItemController.get])



export default loggedItemRouter