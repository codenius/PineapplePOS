import logger from "../utils/logger";

/**
 * A logging middleware, that logs infos to the logger 
 * @deprecated
 */
function loggerMiddleware(req, res, next) {
    logger.info(`${req.method}\t${req.ip}\t${encodeURI(req.path)}`)
    next()
}

export default loggerMiddleware