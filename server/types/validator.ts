import {Model, SchemaTypeOptions} from "mongoose";
import InputError from "./errors/inputError";

function validate(expected: Array<Model<any>|SchemaTypeOptions<any>>|Model<any>|SchemaTypeOptions<any>, input: any) {
    if (Array.isArray(expected) && Array.isArray(input)) {
        if (expected.length !== 1) {
            throw new InputError("Validation failed")
        }
        !input.map(i => validate(expected[0], i))
    } else if (!Array.isArray(expected) && !Array.isArray(input)) {
        if (expected instanceof Model) {
            //@ts-ignore
            let test = new expected(input)
            let err = test.validateSync()
            if (err) {throw new InputError(err._message)}
        }
        else if (expected instanceof SchemaTypeOptions) {
            if (!expected.isValid(input)) {
                throw new InputError("Validation failed")
            }
        }
        throw new InputError("Validation failed")
    } else {
        throw new InputError("Validation failed")
    }
}

export default validate