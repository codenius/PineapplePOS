/**
 * ## Authenticator
 * 
 * A collection of middlewares to manage access from 4 hardcoded access levels.
 * Access of routes is decleared by @access decorators in the documentation.
 * 
 * This types are available
 * 
 * @access - Level:Read
 * @access - Level:Sell
 * @access - Level:Edit
 * @access - Level:Admin
 * 
 * @todo fill the functions
 */
class Authenticator {
    /**
     * Highest access level
     * 
     * @access - Level:Admin
     * @static 
     */
    static admin(req, res, next) {
        next()
    }

    /**
     * Second-highest access level
     * 
     * @access - Level:Edit
     * @static
     */
    static edit(req, res, next) {
        next()
    }
    
    /**
     * Third-highest access level
     * 
     * @access - Level:Sell
     * @static 
     */
    static sell(req, res, next) {
        next()
    }

    /**
     * Lowest access level
     * 
     * @access - Level:Read
     * @static 
     */
    static read(req, res, next) {
        next()
    }
}

export default Authenticator