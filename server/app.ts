import logger from "./utils/logger";
import * as dotenv from "dotenv";
let dotenvConfigOutput = dotenv.config({"path":__dirname+"/backend.env"})
if (!dotenvConfigOutput.error) {
    logger.info("using normal config, because you aren't running: npm run dev")
} else {
    dotenv.config({"path":__dirname+"/../backend.dev.env", debug: true})
    logger.info("using dev config, because you are running: npm run dev")
}
import express from "express";
import { json } from "express";
import { urlencoded } from "body-parser";
import { inputMiddleware } from "./middlewares/inputMiddleware";
import * as mongoose from "mongoose";
import loggerMiddleware from "./middlewares/loggerMiddleware";
import apiRouter from "./routes/api";
import BaseError from "./types/errors/baseError";
import {ErrorJson} from "./types/errors/commons";
import cors from "cors"
import passport from "passport";
import session from "express-session"
import EmployeeModel from "./types/api/employee";
import { Strategy as LocalStrategy } from "passport-local"

const DATABASE_URL = process.env.DB_URL || "mongodb://localhost:27017"
const DATABASE_USER = process.env.DB_USER || undefined
const DATABASE_PASSWORD = process.env.DB_PASSWORD || undefined
const DEBUG = process.env.DEBUG || true
const XS_COOKIE = process.env.XS_COOKIE || false 
    /* makes session cookie XS-compliant, 
    requires secure context (HTTPS), 
    therefor can't be used in local development without additional configuration (local certificates), 
    most useful in crossorigin cloud environments */

mongoose.connect(DATABASE_URL, { user: DATABASE_USER, pass: DATABASE_PASSWORD }).then(
    () => {
        logger.info("connected to database"),
        EmployeeModel.count({level: "admin"}).then((count) => {
            if (count == 0) {
                EmployeeModel.register(new EmployeeModel({username: "admin", level: "admin"}), "admin", (err) => console.log(err))
            }
        })
        
    },
    () => { logger.error(`couldn't connect to database ${DATABASE_URL}, exit`); process.exit(1)}
)

const app = express()

/* Middlewares */
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(inputMiddleware)
app.use(loggerMiddleware)
app.use(cors({ origin: true, credentials: true }))
app.set('trust proxy', true)
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: XS_COOKIE == "true" ? { sameSite: "none", secure: true } : undefined
}))

/* Authentication middlewares */
app.use(passport.initialize())
app.use(passport.session())

passport.use(EmployeeModel.createStrategy());
passport.serializeUser(EmployeeModel.serializeUser());
passport.deserializeUser(EmployeeModel.deserializeUser());

/* Routes */
app.use("/api", apiRouter)

/* Errorhandler */
app.use((err, req, res, next) => {
    if (err instanceof BaseError) {
        err.send(res)
    } else {
        let json: ErrorJson = {
            type: err.name,
            source: "unknown",
            msg: DEBUG ? err.stack : err.message
        }
        res.status(500).json(json)
    }
})

app.listen(3000, () => {
    logger.info("Backend started")
})