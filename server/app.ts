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
import { corsMiddleware } from "./middlewares/corsMiddleware";

const DATABASE_URL = process.env.DB_URL || "mongodb://localhost:27017"
const DEBUG = process.env.DEBUG || true

mongoose.connect(DATABASE_URL).then(
    () => logger.info("connected to database"),
    () => { logger.error(`couldn't connect to database ${DATABASE_URL}, exit`); process.exit(1)}
)

const app = express()

/* Middlewares */
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(inputMiddleware)
app.use(loggerMiddleware)
app.use(corsMiddleware)

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