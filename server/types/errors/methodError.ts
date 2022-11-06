import BaseError from "./baseError";
import {ErrorSource} from "./commons";

/**
 * ## Method error
 *
 * Error to show that a http method isn't allowed
 */
class MethodError extends BaseError {
    /**
     * Inits a method error
     *
     * @param msg - a custom error message,
     * @default msg - Method is not allowed - should be fine (in common)
     * @param src - a Error Source.
     * @default src - internal, the user doesn't choose the request method, so it's our fault
     */
    constructor(msg= "Method is not allowed", src: ErrorSource = "internal") {
        super(msg, src);
        this.name = "MethodError"
    }
}

export default MethodError