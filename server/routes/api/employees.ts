import { Router } from "express";
import passport from "passport";
import EmployeeModel from "../../types/api/employee";
import EmployeeController from "../../controllers/api/employeeController";
import Authenticator from "../../auth/authenticator";
import AuthError from "../../types/errors/authError";

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
        req.logout((err) => { if (err) { return next(err)} })
        res.redirect("/")
    }
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