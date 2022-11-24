import ActionController from "../../controllers/api/actionController";
import Authenticator from "../../auth/authenticator";
import {Router} from "express";

const actionRouter = Router()

/**
 * Get all Actions
 * 
 * @access - Level:Read
 */
actionRouter.get('/', [
    (req,res,next) => Authenticator.read(req,res,next),
    (req,res) => ActionController.select.all(req,res)
])

/**
 * Deletes all actions
 * 
 * @access - Level:Edit
 */
actionRouter.delete('/', [
    (req,res,next) => Authenticator.edit(req,res,next),
    (req,res) => ActionController.delete.all(req,res)
])

/**
 * Get a single Action from id
 * 
 * @access - Level:Read
 */
actionRouter.get('/:id', [
    (req,res,next) => Authenticator.read(req,res,next),
    (req,res) => ActionController.select.single(req,res)
])

/**
 * Delete a single Action from id
 * 
 * @access - Level:Edit
 */
actionRouter.delete('/:id', [
    (req,res,next) => Authenticator.edit(req,res,next),
    (req,res) => ActionController.delete.single(req,res)
])

export default actionRouter