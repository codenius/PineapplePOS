export function corsMiddleware(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*')
    res.setHeader('Access-Control-Allow-Methods', process.env.CORS_METHODS || '*')
    res.setHeader('Access-Control-Allow-Headers', process.env.CORS_HEADERS || '*')
    next()
}