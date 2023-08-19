import ItemController from "../../controllers/api/itemController";
import {Router} from "express";
import Authenticator from "../../auth/authenticator";
import itemVersionRouter from "./itemVersion";
import { SchemaTypes, Types } from "mongoose";
import validate from "../../types/validator";
import category, { getDefaultCategory } from "../../types/api/category";
import {CategoryController} from "../../controllers/api/categoryController";

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
    (req, res, next) => CategoryController.select.all(req, res, next) 
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

/**
 * Get Versions of a single Item from id
 * 
 * @access - Level:Read
 */
itemRouter.use("/:item_id/versions/", [(req, res, next) => {
    validate(Types.ObjectId, req.params.item_id)
    req.body["_id._id"] = new Types.ObjectId(req.params.item_id)
    next()
}, itemVersionRouter])

export default itemRouter