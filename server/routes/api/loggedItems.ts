import LoggedItemController from "../../controllers/api/loggedItemController";
import {Router} from "express";
import Authenticator from "../../auth/authenticator";

const loggedItemRouter = Router()


/**
 * Get all logged Items
 * 
 * @access - Level:Read
 */
loggedItemRouter.get('/', [
    (req,res,next)=>Authenticator.read(req,res,next),
    (req,res,next)=>LoggedItemController.select.all(req,res,next)
])

/**
 * Get a single item from id
 * 
 * @access - Level:Read
 */
loggedItemRouter.get('/:id', [
    (req,res,next)=>Authenticator.read(req,res,next),
    (req,res,next)=>LoggedItemController.select.single(req,res,next)
])

export default loggedItemRouter