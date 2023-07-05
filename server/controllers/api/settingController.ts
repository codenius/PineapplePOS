import {globalSettingModel, userSettingModel} from "../../types/api/setting";
import SimpleController from "../simpleController";

export const globalSettingController = new SimpleController(globalSettingModel)
export const localSettingController = new SimpleController(userSettingModel)