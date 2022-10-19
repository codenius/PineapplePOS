import { Express, json }  from "express";
import { urlencoded } from "body-parser";
import { inputMiddleware, outputMiddleware } from "./middlewares/ioHandler";
import * as mongoose from "mongoose";
import logger from "./utils/logger";

mongoose.connect("mongodb://localhost:8080").then(
    () => logger.info("connected to database"),
    () => { logger.error("couldn't connect to database"); process.exit(1)}
)

const app = Express()

app.use(urlencoded({ extended: true }))
app.use(json())
app.use(inputMiddleware)



/* Routes */


app.use(outputMiddleware)
app.listen(3000, () => {
    console.log("Backend started")
})