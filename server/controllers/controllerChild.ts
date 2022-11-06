import InputError from "../types/errors/inputError";
import SimpleController from "./simpleController";
import {Request, Response} from "express";

/**
 * Controller Child
 *
 * Make Controllers (Mainly the SimpleController) more accessible
 */
class ControllerChild {
    handlers: Array<(req, res) => any>
    singleHandlers: Array<(req, res) => any>
    allHandlers: Array<(req, res) => any>
    instance: SimpleController


    /**
     * Inits the Controller Child
     *
     * @param instance - The parent Controller
     * @param handlers - Middleware handler functions. They get executed every time no matter if single() or all() is called
     * @param singleHandlers - This handler functions are only executed when single() is called.
     * The last value that was returned will be sent to the client
     * @param allHandlers - This handler function are only executed when all() is called.
     * The last value that was returned will be sent to the client
     */
    constructor(
        instance: SimpleController,
        handlers: Array<(req, res) => any> = [],
        singleHandlers: Array<(req, res) => any> = [],
        allHandlers: Array<(req, res) => any> = []
    ) {
        this.handlers = handlers
        this.singleHandlers = singleHandlers
        this.allHandlers = allHandlers
        this.instance = instance
    }

    /**
     * A function that calls all handlers that handle a single requested document (handlers, singleHandlers)
     *
     * @param req - Express Request Object
     * @param res - Express Response Object
     */
    single(req: Request, res: Response) {
        if (Array.isArray(req.body)) { throw new InputError("Validation Error")}
        this.handlers.forEach(fn => fn(req, res))
        res.send(200).json(this.singleHandlers.map(fn => fn(req, res)[-1]))
    }

    /**
     * A function that calls all handlers that handle multiple requested documents (handlers, allHandlers)
     *
     * @param req - Express Request Object
     * @param res - Express Response Object
     */
    all(req: Request, res: Response) {
        // if request body is not an array, it will not execute the handlers
        if (!Array.isArray(req.body)) { throw new InputError("Validation Error")}
        this.handlers.forEach(fn => fn(req, res))
        res.send(200).json(this.singleHandlers.map(fn => fn(req, res)[-1]))
    }
}

export default ControllerChild