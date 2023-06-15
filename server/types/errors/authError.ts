import BaseError from "./baseError";
import {ErrorSource} from "./commons";

/**
 * ## Auth Error
 *
 * Represents errors for false login credentials, false permission level, ...
 */
class AuthError extends BaseError {
    /**
     * inits an auth error
     *
     * @param msg - a custom error message
     * @param src - an error source
     * @default src - user, in rare cases you may set it to another source
     */
    constructor(msg: string, src: ErrorSource = "user") {
        super(msg, src);
        this.name = "AuthError"
    }
}

export default AuthError