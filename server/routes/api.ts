import {Router} from "express";
import itemRouter from "./api/items";
import employeeRouter from "./api/employees";

let apiRouter = Router()

apiRouter.use("/employees", employeeRouter)
apiRouter.use("/items", itemRouter)

export default apiRouter
