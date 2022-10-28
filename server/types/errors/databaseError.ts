import BaseError from "./baseError";

class DatabaseError extends BaseError {
    constructor(msg: string = "If you see this error message, please report it") {
        super(msg, "database");
        this.name = "DatabaseError"
    }
}

export default DatabaseError