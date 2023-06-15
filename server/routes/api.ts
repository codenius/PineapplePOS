import {Router} from "express";
import itemRouter from "./api/items";
import employeeRouter from "./api/employees";
import sellpointRouter from "./api/sellpoint";

let apiRouter = Router()

apiRouter.use("/employees", employeeRouter)
apiRouter.use("/items", itemRouter)
apiRouter.use("/sellpoint", sellpointRouter)

export default apiRouter
