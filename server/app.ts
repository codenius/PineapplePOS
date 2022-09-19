import { Express }  from "express";
import { urlencoded } from "body-parser";
import { inputMiddleware, outputMiddleware } from "./middlewares/io_handler";

const app = Express()

app.use(urlencoded({ extended: true }))
app.use(inputMiddleware)

/* Routes */

app.use(outputMiddleware)
app.listen(3000, () => {
    console.log("Backend started")
})