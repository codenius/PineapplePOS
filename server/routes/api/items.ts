import ItemController from "../../controllers/api/itemController";
import {Router} from "express";
import Authenticator from "../../auth/authenticator";

const itemRouter = Router();

/* Item Router paths using the ItemController */

/*
 * Docs: https://github.com/DoctorFuchs/POS/blob/master/docs/api.md#
 */

itemRouter.get('/', [
    (req, res, next) => Authenticator.read(req, res, next),
    (req, res) => ItemController.get(req, res)
])

itemRouter.post('/new', [
    (req, res, next) => Authenticator.edit(req, res, next),
    (req, res) => ItemController.create(req, res)
])

export default itemRouter