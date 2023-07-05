import {Router} from "express";
import itemRouter from "./api/items";
import employeeRouter from "./api/employees";
import sellpointRouter from "./api/sellpoint";
import settingsRouter from "./api/settings";

let apiRouter = Router()

apiRouter.use("/employees", employeeRouter)
apiRouter.use("/items", itemRouter)
apiRouter.use("/sellpoint", sellpointRouter)
apiRouter.use("/settings", settingsRouter)

export default apiRouter
