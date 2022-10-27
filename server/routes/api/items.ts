import ItemController from "../../controllers/api/itemController";
import {Router} from "express";
import Authenticator from "../../auth/authenticator";

const itemRouter = Router();

/* Item Router paths using the ItemController */

/*
 * Docs: https://github.com/DoctorFuchs/POS/blob/master/docs/api.md#
 */
itemRouter.get('', [Authenticator.read, ItemController.get])
itemRouter.post('/new', [Authenticator.edit, ItemController.create])

export default itemRouter