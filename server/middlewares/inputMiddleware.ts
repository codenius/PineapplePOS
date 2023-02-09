/**
 * recursive JSON mapper
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
                // disallow keys with _ to disallow changes of internal values
                // disallow keys with $ to disallow mongodb command executions
                if (_key.startsWith("_") || _key.startsWith("$")) {
                    delete value[_key]
                } else {
                    value[_key] = mapJSON(value[_key])
                }
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
 * An input middleware for an express router/app to encode input from users.
 * This is our defender against injections from input.
 */
export function inputMiddleware(req, res, next) {
    req.body = mapJSON(req.body, encodeURIComponent) || {}
    next()
}
