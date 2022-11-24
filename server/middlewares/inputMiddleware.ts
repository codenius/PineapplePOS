/* Escape Function, that escapes every type that is possible for json responses */
import logger from "../utils/logger";

/**
 * JSON mapper
 * 
 * @param value - a Json object of any type, that is allowed by json
 * @param fn - a function that gets a single type
 */
function mapJSON(value: object | Array<any> | number | string | boolean, fn: (val) => {} = encodeURIComponent) {
    if (Array.isArray(value)) {
        return value.map(item => mapJSON(item))
    }

    switch (typeof value) {
        case "object": {
            Object.keys(value).forEach((_key) => {
                value[_key] = mapJSON(value[_key])
            })
            return value
        }
        case "string":
        case "number":
        case "boolean": {
            return fn(value)
        }
        default: {
            return null
        }
    }
}

/**
 * A inpt middleware for an express router/app to encode input from users.
 * This is our defender against injections from input.
 */
export function inputMiddleware(req, res, next) {
    req.body = mapJSON(req.body, encodeURIComponent) || {}
    next()
}
