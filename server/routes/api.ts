import {Router} from "express";
import itemRouter from "./api/items";
import employeeRouter from "./api/employees";
import sellpointRouter from "./api/sellpoint";
import settingsRouter from "./api/settings";
import categoriesRouter from "./api/categories";

let apiRouter = Router()

apiRouter.use("/employees", employeeRouter)
apiRouter.use("/items", itemRouter)
apiRouter.use("/sellpoint", sellpointRouter)
apiRouter.use("/settings", settingsRouter)
apiRouter.use("/categories", categoriesRouter)

export default apiRouter
