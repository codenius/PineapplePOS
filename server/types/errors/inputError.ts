import BaseError from "./baseError";
import {ErrorSource} from "./commons";

/**
 * ## Input Error
 *
 * Describes all errors depending on invalid input.
 */
class InputError extends BaseError {
    /**
     * inits an input error
     *
     * @param msg - a custom error message
     * @default msg - gives feedback, that this is an error that shouldn't happen
     * @param src - an error source
     * @default src - user, in rare cases you may set it to another source
     */
    constructor(msg: string = "If you see this error message, please report it", src: ErrorSource = "user") {
        super(msg, src);
        this.name = "InputError"
    }
}

export default InputError