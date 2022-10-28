import BaseError from "./baseError";
import {ErrorSource} from "./commons";

class InputError extends BaseError {
    constructor(msg: string = "If you see this error message, please report it", src: ErrorSource = "user") {
        super(msg, src);
        this.name = "InputError"
    }
}

export default InputError