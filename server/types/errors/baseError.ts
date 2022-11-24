import {ErrorCodes, ErrorJson, ErrorSource} from "./commons";

/**
 * ## Base Error
 *
 * Base error class for custom errors. It comes with additional features, like a custom src, error to json, ...
 */
class BaseError extends Error {
    src: ErrorSource
    name: string

    /**
     * @constructor
     * @param msg = A message that is thrown to the user
     * @param src = A error source 
     */
    constructor(msg: string = "If you see this error message, please report it", src: ErrorSource) {
        super(msg);
        this.src = src
        this.name = "BaseError"
        Object.setPrototypeOf(this, BaseError.prototype);
    }

    /**
     * Converts the error into JSON
     * 
     * @returns ErrorJson
     */
    toErrorJson(): ErrorJson {
        return {
            type: this.name,
            source: this.src,
            msg: this.message
        }
    }

    /**
     * sends the json as error response
     * 
     * @param res - an express Response object 
     */
    send(res) {
        res.status(ErrorCodes[this.src]).json(this.toErrorJson())
    }
}

export default BaseError