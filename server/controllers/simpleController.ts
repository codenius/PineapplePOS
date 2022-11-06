import {Model, Types} from "mongoose";
import InputError from "../types/errors/inputError";
import DatabaseError from "../types/errors/databaseError";
import validate from "../types/validator";
import MethodError from "../types/errors/methodError";
import ControllerChild from "./controllerChild";
import {Request, Response} from "express";

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

    /**
     * Inits the SimpleController from a mongoose model
     *
     * @param model - A mongoose model object that is related to any mongoose schema
     */
    constructor(model: Model<any>) {
        this.model = model
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
        ],[
            (req, res) => {
                validate(Types.ObjectId, req.params.id)
                return this.model.findById(req.params.id).exec()
            }
        ], [
            (req, res) => {
                return this.model.find(req.body).exec()
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
            (req, res) => {this.allowMethod(req, res, ["PUT", "PATCH"])}
        ],[
            (req, res) => {
                validate(Types.ObjectId, req.params.id)
                validate(this.model, req.body)
                return this.model.findByIdAndUpdate(req.params.id, req.body).exec()
            }
        ], [
            (req, res) => {
                validate([this.model], req.body)
                return req.body.map(elem => this.model.findByIdAndUpdate(elem._id, elem).exec())
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
            (req, res) => {this.allowMethod(req, res, ["DELETE"])}
        ], [
            (req, res) => {
                validate(Types.ObjectId, req.params.id)
                return this.model.findByIdAndDelete(req.params.id).exec()
            }
        ], [
            (req, res) => {
                validate([Types.ObjectId], req.body)
                return req.body.map(elem => this.model.findByIdAndDelete(elem._id, elem).exec())
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
            (req, res) => {this.allowMethod(req, res, ["POST"])}
        ], [
            (req, res) => {
                validate(this.model, req.body)
                let document = new this.model(req.body)
                let err = document.validateSync()
                if (err) { throw new DatabaseError(err._message) }
                document.save()
                return document
            }
        ], [
            (req, res) => {
                throw new InputError("Can't create multiple documents at the same time")
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
    private allowMethod(req: Request, res: Response, methods : Array<"GET"|"POST"|"PUT"|"DELETE"|"PATCH"|string>) {
        if (!methods.includes(req.method.toUpperCase())) {
            throw new MethodError(`${req.method} method is not allowed`)
        }
    }
}

export default SimpleController