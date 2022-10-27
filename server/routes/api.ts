import {Router} from "express";
import actionRouter from "./api/actions";
import itemRouter from "./api/items";
import loggedItemRouter from "./api/loggedItems";
import employeeRouter from "./api/employees";

let apiRouter = Router()

apiRouter.use("/actions", actionRouter)
apiRouter.use("/employees", employeeRouter)
apiRouter.use("/items", itemRouter)
apiRouter.use("/logged-items", loggedItemRouter)

export default apiRouter
