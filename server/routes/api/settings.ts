import { Router } from "express"
import Authenticator from "../../auth/authenticator"
import { localSettingController, globalSettingController } from "../../controllers/api/settingController"

const settingsRouter = Router()

function setUser(req, res, next) {
    req.body["user"] = req.user._id
    console.log(req.user._id)
    next()
}

settingsRouter.post("/local/new", [
    (req, res, next) => Authenticator.read(req, res, next),
    (req, res, next) => setUser(req, res, next),
    (req, res, next) => localSettingController.create.single(req, res, next)
])

settingsRouter.get("/local/", [
    (req, res, next) => Authenticator.read(req, res, next),
    (req, res, next) => setUser(req, res, next),
    (req, res, next) => localSettingController.select.all(req, res, next)
])

settingsRouter.put("/local/:id", [
    (req, res, next) => Authenticator.read(req, res, next),
    (req, res, next) => localSettingController.update.single(req, res, next)
])

settingsRouter.delete("/local/:id", [
    (req, res, next) => Authenticator.read(req, res, next),
    (req, res, next) => setUser(req, res, next),
    (req, res, next) => localSettingController.delete.single(req, res, next)
])

settingsRouter.post("/global/new", [
    (req, res, next) => Authenticator.admin(req, res, next),
    (req, res, next) => globalSettingController.create.single(req, res, next)
])

settingsRouter.get("/global/", [
    (req, res, next) => globalSettingController.select.all(req, res, next)
])

settingsRouter.put("/global/:id", [
    (req, res, next) => Authenticator.admin(req, res, next),
    (req, res, next) => globalSettingController.update.single(req, res, next)
])

settingsRouter.delete("/global/:id", [
    (req, res, next) => Authenticator.admin(req, res, next),
    (req, res, next) => globalSettingController.delete.single(req, res, next)
])
export default settingsRouter