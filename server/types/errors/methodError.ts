import BaseError from "./baseError";
import {ErrorSource} from "./commons";

class MethodError extends BaseError {
    constructor(msg= "Method is not allowed", src: ErrorSource = "internal") {
        super(msg, src);
        this.name = "MethodError"
    }
}

export default MethodError