import ActionController from "../../controllers/api/actionController";
import Authenticator from "../../auth/authenticator";
import {Router} from "express";

const actionRouter = Router()

/* Action Router paths using the ActionController */

/**
 * Docs: https://github.com/DoctorFuchs/POS/blob/master/docs/api.md#actions
 */

actionRouter.get('/', [
    (req,res,next) => Authenticator.read(req,res,next),
    (req,res) => ActionController.select.all(req,res)
])

actionRouter.delete('/', [
    (req,res,next) => Authenticator.edit(req,res,next),
    (req,res) => ActionController.delete.all(req,res)
])

actionRouter.get('/:id:', [
    (req,res,next) => Authenticator.read(req,res,next),
    (req,res) => ActionController.select.single(req,res)
])

actionRouter.delete('/:id:', [
    (req,res,next) => Authenticator.edit(req,res,next),
    (req,res) => ActionController.delete.single(req,res)
])

export default actionRouter