import ItemController from "../../controllers/api/itemController";
import {Router} from "express";
import Authenticator from "../../auth/authenticator";

const itemRouter = Router();

/* Item Router paths using the ItemController */

/* 
 * Docs: https://github.com/DoctorFuchs/POS/blob/master/docs/api.md#items
 */

itemRouter.get('/', [
    (req,res,next)=>Authenticator.read(req,res,next),
    (req,res)=>ItemController.get(req,res)
])
itemRouter.post('/new', [
    (req,res,next)=>Authenticator.edit(req,res,next),
    (req,res)=>ItemController.create(req,res)
])
itemRouter.get('/:id:', [
    (req,res,next)=>Authenticator.read(req,res,next),
    (req,res)=>ItemController.getSingle(req,res)
])
itemRouter.delete('/:id:', [
    (req,res,next)=>Authenticator.edit(req,res,next),
    (req,res)=>ItemController.deleteSingle(req,res)
])
itemRouter.put('/:id:', [
    (req,res,next)=>Authenticator.edit(req,res,next),
    (req,res)=>ItemController.editSingle(req,res)
])
itemRouter.get('/:id:/recover', [
    (req,res,next)=>Authenticator.edit(req,res,next),
    (req,res)=>ItemController.recoverSingle(req,res)
])
itemRouter.get('/:id:/actions', [
    (req,res,next)=>Authenticator.read(req,res,next),
    (req,res)=>ItemController.getSingleActions(req,res)
])
itemRouter.delete('/:id:/actions', [
    (req,res,next)=>Authenticator.edit(req,res,next),
    (req,res)=>ItemController.deleteSingleActions(req,res)
])






export default itemRouter