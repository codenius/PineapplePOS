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
        allHandlers: Array<(req, res) => any > = []
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
        this.handlers.forEach(fn => fn(req, res))
        let json = this.singleHandlers.map(fn => fn(req, res)).at(-1)
        this.send(res, 200, json)
    }

    /**
     * A function that calls all handlers that handle multiple requested documents (handlers, allHandlers)
     *
     * @param req - Express Request Object
     * @param res - Express Response Object
     */
    all(req: Request, res: Response) {
        this.handlers.forEach(fn => fn(req, res))
        let json = this.allHandlers.map(fn => fn(req, res)).at(-1)
        this.send(res, 200, json)
    }

    /**
     * Internal send function for the controller child, it unpacks the json, if json is a Promise
     *
     * @param res - Express Response object
     * @param code - HTTP Status code
     * @param json - Content of the response
     */
    private send(res, code, json) {
        const _send = (_json) => res.status(code).json(_json)
        if (!(json instanceof Promise)) {
            _send(json)
        } else {
            json.then((j) => {_send(j)})
        }
    }
}

export default ControllerChild