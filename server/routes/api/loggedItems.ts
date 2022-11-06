import LoggedItemController from "../../controllers/api/loggedItemController";
import {Router} from "express";
import Authenticator from "../../auth/authenticator";

const loggedItemRouter = Router()

/* Logged Item Router paths using the LoggedItemController */

/** 
 * * Docs: https://github.com/DoctorFuchs/POS/blob/master/docs/api.md#logged-items
 */

loggedItemRouter.get('/', [
    (req,res,next)=>Authenticator.read(req,res,next),
    (req,res)=>LoggedItemController.select.all(req,res)
])
loggedItemRouter.get('/:id:', [
    (req,res,next)=>Authenticator.read(req,res,next),
    (req,res)=>LoggedItemController.select.single(req,res)
])





export default loggedItemRouter