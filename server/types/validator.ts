import {Model, SchemaTypeOptions} from "mongoose";
import InputError from "./errors/inputError";
import BaseError from "./errors/baseError";
import logger from "../utils/logger";

/**
 * a function to validate mongoose models and mongoose SchemaTypes (ObjectId, String, ...)
 *
 * @param expected - an array or single model or schema type (array.length should be 1)
 * @param input - any input that should be checked
 *
 * @throws InputError - when the check fails
 */
function validate(expected: Array<Model<any>|SchemaTypeOptions<any>>|Model<any>|SchemaTypeOptions<any>, input: any) {
    logger.info(`Validate: input: ${input} (is Array: ${Array.isArray(input)})\n expected: ${expected} (type ${typeof expected})`)
    // case: both are arrays
    if (Array.isArray(expected) && Array.isArray(input)) {
        // check array length
        if (expected.length !== 1) {
            throw new BaseError("Validation failed: Expected array length is not 1", "internal")
        }

        // validates the expected type and the input again, with the validator
        input.map(i => validate(expected[0], i))

    }
    // Case: both are non-arrays
    else if (!Array.isArray(expected) && !Array.isArray(input)) {
        // expected is a mongoose model
        if (expected instanceof Model || expected instanceof Function) {
            //@ts-ignore
            // using the integrated validator for the model:
            // create a new element
            let test = new expected(input)
            // validate the element
            let err = test.validateSync()
            // when validation fails, throw a new InputError
            if (err) {throw new InputError(err._message)}
        }
        // expected a SchemaType, like ObjectID
        else if (expected instanceof SchemaTypeOptions) {
            // using integrated validator
            if (!expected.isValid(input)) {
                // validation fails
                throw new InputError(`Validation failed: SchemaType is not valid, should be ${expected}`)
            }
        }
        else {
            // default, if expected is something else
            throw new BaseError("Validation failed: Invalid expectations", "internal")
        }
    } else {
        // check can not be true, because they are not the same format (array, or not array, that is the question )
        throw new InputError("Validation failed: Expected and given are not the same format")
    }
}

export default validate