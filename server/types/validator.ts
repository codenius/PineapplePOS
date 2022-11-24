import {Model, SchemaTypeOptions} from "mongoose";
import InputError from "./errors/inputError";
import BaseError from "./errors/baseError";
import logger from "../utils/logger";

/**
 * a function to validate mongoose models and mongoose SchemaTypes (ObjectId, String, ...)
 *
 * @param validator - an array or single model or schema type (array.length should be 1)
 * @param input - any input that should be checked
 *
 * @throws InputError - when the check fails
 */
function validate(validator: Function|Array<Function>, input: any) {
    // case: both are arrays
    if (Array.isArray(validator) && Array.isArray(input)) {
        // check array length
        if (validator.length !== 1) {
            throw new BaseError("Validation failed: Expected array length is not 1", "internal")
        }

        // validates the expected type and the input again, with the validator
        input.map(i => validate(validator[0], i))
    }
    // Case: both are non-arrays
    else if (!Array.isArray(validator) && !Array.isArray(input)) {
        try {
            let out = validator(input)
            if (out.validateSync) {
                out.validateSync()
            }
            return out
        } catch (e) {
            throw new InputError("Validation failed: Validator function doesn't accepts the input")
        }
    } else {
        // check can not be true, because they are not the same format (array, or not array, that is the question )
        throw new InputError("Validation failed: Expected and given are not the same format")
    }
}

export default validate