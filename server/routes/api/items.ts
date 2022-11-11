import ItemController from "../../controllers/api/itemController";
import {Router} from "express";
import Authenticator from "../../auth/authenticator";
import ActionController from "../../controllers/api/actionController";
import SimpleController from "../../controllers/simpleController";

const itemRouter = Router();

/* Item Router paths using the ItemController
 *
 * Docs: https://github.com/DoctorFuchs/POS/blob/master/docs/api.md#items
 */

itemRouter.get('/', [
    (req,res,next) => Authenticator.read(req,res,next),
    (req,res) => ItemController.select.all(req,res)
])

itemRouter.post('/new', [
    (req,res,next) => Authenticator.edit(req,res,next),
    (req,res) => ItemController.create.single(req,res)
])

itemRouter.get('/:id:', [
    (req,res,next) => Authenticator.read(req,res,next),
    (req,res) => ItemController.select.single(req,res)
])

itemRouter.delete('/:id:', [
    (req,res,next) => Authenticator.edit(req,res,next),
    (req,res) => ItemController.delete.single(req,res)
])

itemRouter.put('/:id:', [
    (req,res,next) => Authenticator.edit(req,res,next),
    (req,res) => ItemController.update.single(req,res)
])

/* TODO: NEED AN UPDATE OF THE SIMPLE CONTROLLER (for DoctorFuchs)
itemRouter.get('/:id:/recover', [
    (req,res,next) => Authenticator.edit(req,res,next),
    (req,res) => ItemController.recoverSingle(req,res)
])

itemRouter.get('/:id:/actions', [
    (req,res,next) => Authenticator.read(req,res,next),
    (req,res) => ActionController.get(req,res, {
        deleted: false,
        old_item: {
            original_item_id: SimpleController.validateId(req.params.id) // validate ID to refuse any injection
        }})
])

itemRouter.delete('/:id:/actions', [
    (req,res,next) => Authenticator.edit(req,res,next),
    (req,res) => ActionController.delete(req,res, {
        deleted: false,
        old_item: {
            original_item_id: SimpleController.validateId(req.params.id) // validate ID to refuse any injection
        }})
])
*/

export default itemRouter