/* Escape Function, that escapes every type that is possible for json responses */
function mapJSON(value: object | Array<any> | number | string | boolean, fn = encodeURIComponent) {
    if (Array.isArray(value)) {
        return value.map(item => mapJSON(item))
    }
    else if (typeof value === "object") {
        let copy = {}
        Object.entries(value).forEach(([_key, _value]) => {
            copy[_key] = mapJSON(_value)
        })
        return copy
    }
    else if (["string", "number", "boolean"].includes(typeof value)) {
        //@ts-ignore
        return fn(value)
    }
    else {
        return null;
    }
}

export function inputMiddleware(req, res, next) {
    req.body = mapJSON(req.body, encodeURIComponent) || {}
    next()
}

export function outputMiddleware(req, res, next) {
    res.body = mapJSON(res.body, decodeURIComponent) || {}
    next()
}