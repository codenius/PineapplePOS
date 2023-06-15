import passport from "passport"
import AuthError from "../types/errors/authError"

export const AuthenticationLevels = {
    read: 0,
    sell: 1,
    edit: 2,
    admin: 3
}

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
        Authenticator.main(req, res, next, AuthenticationLevels.admin)
    }

    /**
     * Second-highest access level
     * 
     * @access - Level:Edit
     * @static
     */
    static edit(req, res, next) {
        Authenticator.main(req, res, next, AuthenticationLevels.edit)
    }
    
    /**
     * Third-highest access level
     * 
     * @access - Level:Sell
     * @static 
     */
    static sell(req, res, next) {
        Authenticator.main(req, res, next, AuthenticationLevels.sell)
    }

    /**
     * Lowest access level
     * 
     * @access - Level:Read
     * @static 
     */
    static read(req, res, next) {
        Authenticator.main(req, res, next, AuthenticationLevels.read)
    }

    static main(req, res, next, level: number) {
        if (process.env.DEBUG) {next(); return }
        passport.authenticate("local")(req, res, () => {    
            const AUTHENTICATED = AuthenticationLevels[req.user.level] >= level
            if (AUTHENTICATED) {
                next()
            } else {
                next(new AuthError("AuthError: You don't have the permission to do that"))
            }
        })
    }
}

export default Authenticator