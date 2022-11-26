import ItemController from "../../controllers/api/itemController";
import {Router} from "express";
import Authenticator from "../../auth/authenticator";
import ActionController from "../../controllers/api/actionController";
import validate from "../../types/validator";
import {Types} from "mongoose";
import actionRouter from "./actions";

const itemRouter = Router();

/**
 * Get all Items
 * 
 * @access - Level:Read
 */
itemRouter.get('/', [
    (req,res,next) => Authenticator.read(req,res,next),
    (req,res,next) => ItemController.select.all(req,res,next)
])

/**
 * Creates a new Item
 * 
 * @access - Level:Edit
 */
itemRouter.post('/new', [
    (req,res,next) => Authenticator.edit(req,res,next),
    (req,res,next) => ItemController.create.single(req,res,next)
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
 * Get all item companies
 *
 * @access - Level:Read
 */
itemRouter.get("/companies", [
    (req, res, next) => Authenticator.read(req, res, next),
    async (req, res) => {
        let items = await ItemController.model.find().exec()
        res.status(200).json([...new Set(items.map(item => item["company"]))])
    }
])

/**
 * Gets a single Item from id
 * 
 * @access - Level:Read
 */
itemRouter.get('/:id', [
    (req,res,next) => Authenticator.read(req,res,next),
    (req,res,next) => ItemController.select.single(req,res,next)
])

/**
 * Deletes a single Item from id
 * 
 * @access - Level:Edit
 */
itemRouter.delete('/:id', [
    (req,res,next) => Authenticator.edit(req,res,next),
    (req,res,next) => ItemController.delete.single(req,res,next)
])

/**
 * Updates a single Item from id
 * 
 * @access - Level:Edit
 */
itemRouter.put('/:id', [
    (req,res,next) => Authenticator.edit(req,res,next),
    (req,res,next) => ItemController.update.single(req,res,next)
])

itemRouter.use("/:item_id/actions/", [(req, res, next) => {
    if (req.method == "GET") {
        validate(Types.ObjectId, req.params.item_id)
        req.body.original_item_id = req.params.item_id
    }
    next()
}, actionRouter])

export default itemRouter