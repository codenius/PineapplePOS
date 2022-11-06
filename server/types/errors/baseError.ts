import {ErrorCodes, ErrorJson, ErrorSource} from "./commons";

/**
 * ## Base Error
 *
 * Base error class for custom errors. It comes with additional features, like a custom src, error to json, ...
 */
class BaseError extends Error {
    src: ErrorSource
    name: string

    constructor(msg: string = "If you see this error message, please report it", src: ErrorSource) {
        super(msg);
        this.src = src
        this.name = "BaseError"
        Object.setPrototypeOf(this, BaseError.prototype);
    }

    toErrorJson(): ErrorJson {
        return {
            type: this.name,
            source: this.src,
            msg: this.message
        }
    }

    send(res) {
        res.status(ErrorCodes[this.src]).json(this.toErrorJson())
    }
}

export default BaseError