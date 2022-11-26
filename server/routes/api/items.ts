import ItemController from "../../controllers/api/itemController";
import {Router} from "express";
import Authenticator from "../../auth/authenticator";
import ActionController from "../../controllers/api/actionController";
import SimpleController from "../../controllers/simpleController";
import validate from "../../types/validator";
import {Types} from "mongoose";

const itemRouter = Router();

/**
 * Get all Items
 * 
 * @access - Level:Read
 */
itemRouter.get('/', [
    (req,res,next) => Authenticator.read(req,res,next),
    (req,res) => ItemController.select.all(req,res)
])

/**
 * Creates a new Item
 * 
 * @access - Level:Edit
 */
itemRouter.post('/new', [
    (req,res,next) => Authenticator.edit(req,res,next),
    (req,res) => ItemController.create.single(req,res)
])

/**
 * Get all item categories
 *
 * @access - Level:Read
 */
itemRouter.get("/categories", [
    (req, res, next) => Authenticator.read(req, res, next),
    async (req, res) => {
        let items = await ItemController.model.find().exec()
        res.status(200).json([...new Set(items.map(item => item["category"]))])
    }
])

/**
 * Gets a single Item from id
 * 
 * @access - Level:Read
 */
itemRouter.get('/:id', [
    (req,res,next) => Authenticator.read(req,res,next),
    (req,res) => ItemController.select.single(req,res)
])

/**
 * Deletes a single Item from id
 * 
 * @access - Level:Edit
 */
itemRouter.delete('/:id', [
    (req,res,next) => Authenticator.edit(req,res,next),
    (req,res) => ItemController.delete.single(req,res)
])

/**
 * Updates a single Item from id
 * 
 * @access - Level:Edit
 */
itemRouter.put('/:id', [
    (req,res,next) => Authenticator.edit(req,res,next),
    (req,res) => ItemController.update.single(req,res)
])


itemRouter.get("/:id/actions", [
    (req, res, next) => Authenticator.read(req, res, next),
    (req, res) => {
        validate(Types.ObjectId, req.params.id)
        req.body.orginal_item_id = req.params.id
        ActionController.select.all(req, res)
    }
])

itemRouter.get("/:item_id/actions/:id", [
    (req, res, next) => Authenticator.read(req, res, next),
    (req, res) => {
        validate(Types.ObjectId, req.params.id)
        req.body.orginal_item_id = req.params.id
        ActionController.select.single(req, res)
    }
])
export default itemRouter