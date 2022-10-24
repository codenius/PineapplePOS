import logger from "../utils/logger";

function loggerMiddleware(req, res, next) {
    logger.info(`${req.method}\t${req.ip}\t${encodeURI(req.path)}`)
    next()
}

export default loggerMiddleware