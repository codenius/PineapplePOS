import {ErrorCodes, ErrorJson, ErrorSource} from "./commons";

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