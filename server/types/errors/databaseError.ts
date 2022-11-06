import BaseError from "./baseError";

/**
 * ## Database Error
 *
 * Describes all errors that depends on database.
 */
class DatabaseError extends BaseError {
    /**
     * Inits a database error
     *
     * @param msg - a custom msg
     * @default msg - gives feedback, that this is an error that shouldn't happen
     */
    constructor(msg: string = "If you see this error message, please report it") {
        super(msg, "database");
        this.name = "DatabaseError"
    }
}

export default DatabaseError