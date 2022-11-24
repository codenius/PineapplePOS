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
    (req,res)=>LoggedItemController.select.all(req,res)
])

/**
 * Get a single item from id
 * 
 * @access - Level:Read
 */
loggedItemRouter.get('/:id:', [
    (req,res,next)=>Authenticator.read(req,res,next),
    (req,res)=>LoggedItemController.select.single(req,res)
])





export default loggedItemRouter