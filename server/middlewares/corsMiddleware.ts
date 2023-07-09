/**
 * @deprecated replaced by {@link https://www.npmjs.com/package/cors}
 */
export function corsMiddleware(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || req.get('Origin') || '*')
    res.setHeader('Access-Control-Allow-Methods', process.env.CORS_METHODS || '*')
    res.setHeader('Access-Control-Allow-Headers', process.env.CORS_HEADERS || req.get('Access-Control-Request-Headers') || '*')
    res.setHeader('Access-Control-Allow-Credentials', process.env.CORS_CREDENTIALS || 'true')
    next()
}