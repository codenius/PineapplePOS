import ItemController from "../../controllers/api/itemController";
import ActionController from "../../controllers/api/actionController";
import {Router} from "express";
import Authenticator from "../../auth/authenticator";

const itemRouter = Router();

/* Item Router paths using the ItemController */

/* 
 * Docs: https://github.com/DoctorFuchs/POS/blob/master/docs/api.md#items
 */
itemRouter.get('', [Authenticator.read, ItemController.get])
itemRouter.post('/new', [Authenticator.edit, ItemController.create])
itemRouter.get(':id:', [Authenticator.read, ItemController.getSingle])
itemRouter.delete(':id:', [Authenticator.edit, ItemController.deleteSingle])
itemRouter.put(':id:', [Authenticator.edit, ItemController.editSingle])
itemRouter.get(':id:/recover', [Authenticator.read, ItemController.recoverSingle])
itemRouter.get(':id:/actions', [Authenticator.read, ActionController.get])
itemRouter.delete(':id:/actions', [Authenticator.edit, ActionController.delete])



export default itemRouter