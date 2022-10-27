import express from "express";
import { json } from "express";
import { urlencoded } from "body-parser";
import { inputMiddleware } from "./middlewares/inputMiddleware";
import * as mongoose from "mongoose";
import logger from "./utils/logger";
import loggerMiddleware from "./middlewares/loggerMiddleware";
import apiRouter from "./routes/api";

const DATABASE_URL = process.env.DB_URL || "mongodb://localhost:27017"

mongoose.connect(DATABASE_URL).then(
    () => logger.info("connected to database"),
    () => { logger.error("couldn't connect to database, exit"); process.exit(1)}
)

const app = express()

/* Middlewares */
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(inputMiddleware)
app.use(loggerMiddleware)

/* Routes */
app.use("/api", apiRouter)

/* Errorhandler */
app.use((err, req, res, next) => {
    res.send({error_type: "unknown", msg: err.stack}) // CHANGE IN PRODUCTION!
})

app.listen(3000, () => {
    logger.info("Backend started")
})