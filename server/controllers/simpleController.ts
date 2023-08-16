import mongoose, { Model, QueryOptions, Types } from "mongoose";
import DatabaseError from "../types/errors/databaseError";
import validate, { validateModel } from "../types/validator";
import MethodError from "../types/errors/methodError";
import ControllerChild from "./controllerChild";
import { Request, Response } from "express";
import sells from "../types/api/sells";

/**
 * ## Simple Controller
 *
 * A simple controller has the ability to control simple management tasks.
 * A controller like this connects the database (MongoDB) and Express with each other.
 *
 * For example select, update, delete, create statements.
 */
class SimpleController {
    model: Model<any>
    options: QueryOptions

    /**
     * Inits the SimpleController from a mongoose model
     *
     * @param model - A mongoose model object that is related to any mongoose schema
     */
    constructor(model: Model<any>) {
        this.model = model
        this.options = { new: true, runValidators: true }
    }


    /**
     * ## Select
     *
     * This controller child manages selecting. It has the ability to read documents from the database.
     *
     * @returns ControllerChild
     */
    get select() {
        return new ControllerChild(this, [
            /* Only allow GET methods */
            (req, res) => { this.allowMethod(req, res, ["GET"]) }
        ], [
            async (req, res) => {
                validate(Types.ObjectId, req.params.id)
                return await this.model.findById(req.params.id).lean({ autopopulate: true })
            }
        ], [
            async (req, res) => {
                let filter = req.body || {}
                return await this.model.find(filter).lean({ autopopulate: true })
            }
        ]);
    }


    /**
     * ## Update
     *
     * This controller child manages editing/updating. It has the ability to change documents from the database.
     */
    get update() {
        return new ControllerChild(this, [
            (req, res) => { this.allowMethod(req, res, ["PUT", "PATCH"]) },
        ], [
            async (req, res) => {
                validate(Types.ObjectId, req.params.id)
                validateModel(this.model, req.body)
                if (Object.keys(req.body).length != 0) {
                    return await this.model.findByIdAndUpdate(req.params.id, req.body, this.options).lean()
                } else {
                    return await this.model.findById(req.params.id).lean()
                }
            }
        ], [
            async (req, res) => {
                return await req.body.map(async elem => {
                    validateModel(this.model, elem)
                    await this.model.findByIdAndUpdate(elem.id, elem, this.options).lean()
                })
            }
        ]);
    }

    /**
     * ## Delete
     *
     * This controller child manages deleting. It has the ability to delete documents from the database.
     */
    get delete() {
        return new ControllerChild(this, [
            (req, res) => { this.allowMethod(req, res, ["DELETE"]) }
        ], [
            async (req, res) => {
                validate(Types.ObjectId, req.params.id)
                req.body._id = req.params.id
                return await this.model.findOneAndDelete(req.body, this.options).lean()
            }
        ], [
            async (req, res) => {
                validate([Types.ObjectId], req.body)
                return await req.body.map(async elem => {
                    await this.model.findOneAndDelete(elem, this.options).lean()
                })
            }
        ]);
    }

    /**
     * ## Create
     *
     * This controller child manages creating. It has the ability to create new documents and add them to the database.
     */
    get create() {
        return new ControllerChild(this, [
            (req, res) => { this.allowMethod(req, res, ["POST"]) }
        ], [
            async (req, res) => {
                let document = new this.model(req.body)
                let err = await document.validate()
                if (err) { throw new DatabaseError(err._message) }
                await document.save()
                return document
            }
        ], [
            async (req, res) => {
                const session = await this.model.startSession()
                await session.withTransaction(async () => {
                    for (const elem of req.body) {
                        let document = new this.model(elem)
                        let err = document.validateSync()
                        if (err) {
                            await session.abortTransaction()
                            session.endSession()
                            throw new DatabaseError(err._message)
                        }
                        await document.save()
                    }    
                })
                await session.commitTransaction()
                session.endSession()
                return {
                    note: "NOT IMPLEMENTED, BECAUSE OF https://jira.mongodb.org/browse/NODE-2014"
                }
            }
        ])
    }

    /**
     * A middleware to restrict invalid http methods.
     *
     * @param req - Express request object
     * @param res - Express response object
     * @param methods - An array of allowed http methods
     * @private
     */
    private allowMethod(req: Request, res: Response, methods: Array<"GET" | "POST" | "PUT" | "DELETE" | "PATCH" | string>) {
        if (!methods.includes(req.method.toUpperCase())) {
            throw new MethodError(`${req.method} method is not allowed`)
        }
    }
}

export default SimpleController