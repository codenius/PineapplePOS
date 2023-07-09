import { Router } from "express";
import passport from "passport";
import EmployeeModel from "../../types/api/employee";
import EmployeeController from "../../controllers/api/employeeController";
import Authenticator from "../../auth/authenticator";

const employeeRouter = Router()

/** 
 * Register a new employee
 */
employeeRouter.post('/register', [
    (req, res, next) => {
        EmployeeModel.register(new EmployeeModel({username: req.body.username}), req.body.password, (err) => {
            if (err) { next(err) }
            else { res.redirect("/api/employees/login") }
        })
    }
])

/**
 * Logins an existing employee
 */
employeeRouter.post('/login', [
    passport.authenticate('local'), 
    (req, res, next) => { res.status(200).json(req.user) }
]);

/**
 * Logouts an employee
 */
employeeRouter.post('/logout', [
    (req, res, next) => Authenticator.read(req, res, next),
    (req, res, next) => {
        req.logout((err) => { if (err) { return next(err)} else { res.status(200).send('ok') } })
    }
])

employeeRouter.post("/password/change", [
    (req, res, next) => Authenticator.read(req, res, next),
    (req, res, next) => {
        req.user.changePassword(req.body.oldpassword, req.body.newpassword, (err) => next(err))
        res.status(200).json({message: "password set successful"});
    }
])

/**
 * Reset password
 * 
 * @access - Level: Admin
 */
employeeRouter.post('/password/reset/:id', [
    (req, res, next) => Authenticator.admin(req, res, next),
    (req, res, next) => {
        EmployeeModel.findById(req.params.id).then(function(sanitizedUser){
            if (sanitizedUser){
                sanitizedUser.setPassword("password", function(){
                    sanitizedUser.save();
                    res.status(200).json({message: "password reset successful"});
                });
            } else {
                res.status(500).json({message: "This user does not exist"});
            }
        })
    }
])


/**
 * Get all employees
 * 
 * @access - Level: Admin
 */
employeeRouter.get("/", [
    (req, res, next) => Authenticator.admin(req, res, next),
    (req, res, next) => EmployeeController.select.all(req, res, next) 
])

/**
 * Get current employee
 *
 * @access - Level: Read
 */
employeeRouter.get("/current", [
    (req, res, next) => Authenticator.read(req, res, next),
    (req, res, next) => { res.status(200).json(req.user) }
])

/**
 * Gets a single employee from id
 * 
 * @access - Level:Read
 */
employeeRouter.get('/:id', [
    (req,res,next) => Authenticator.admin(req,res,next),
    (req,res,next) => EmployeeController.select.single(req,res,next)
])

/**
 * Deletes an employee from id
 * 
 * @access - Level: Admin
 */
employeeRouter.delete("/:id", [
    (req, res, next) => Authenticator.admin(req, res, next),
    (req, res, next) => EmployeeController.delete.single(req, res, next) 
])

/**
 * Edit an employee from id
 * 
 * @access - Level: Admin
 */
employeeRouter.put("/:id", [
    (req, res, next) => Authenticator.admin(req, res, next),
    (req, res, next) => EmployeeController.update.single(req, res, next) 
])

export default employeeRouter