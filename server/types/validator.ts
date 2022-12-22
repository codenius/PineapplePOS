import InputError from "./errors/inputError";
import BaseError from "./errors/baseError";
import { Model, SchemaType } from "mongoose";
import DatabaseError from "./errors/databaseError";

/**
 * a function to validates mongoose SchemaTypes (ObjectId, String, ...) arrays and non arrays
 *
 * @param validator - an array or single schema type (array.length should be 1)
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

        // validates the expected type and the input again, recursive
        input.map(i => validate(validator[0], i))
    }
    // Case: both are non-arrays
    else if (!Array.isArray(validator) && !Array.isArray(input)) {
        try {
            return validator(input)
        } catch (e) {
            throw new InputError("Validation failed: Validator function doesn't accepts the input")
        }
    } else {
        // check can not be true, because they are not the same format (array, or not array, that is the question )
        throw new InputError("Validation failed: Expected and given are not the same format")
    }
}

export function validateModel(model: Model<any>, doc: object, ignoreRequired: boolean = true) {
    model.schema.eachPath((path: string, type: SchemaType<any>) => {
        let value = doc[path]
        if ( !ignoreRequired && !value && type.isRequired) { throw new InputError(`${path} is required`) }
        if ( !value ) { return } 
        validate(type.options.type, value)
    })
}

export default validate