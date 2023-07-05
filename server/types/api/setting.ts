import { Schema, model } from "mongoose";

export const GlobalSetting = new Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    value: {
        type: Schema.Types.Mixed,
        required: true
    }
})

export const UserSetting = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "employee"
    } 
}).add(GlobalSetting)


export const userSettingModel = model("UserSetting", UserSetting, "settings.user")
export const globalSettingModel = model("GlobalSetting", GlobalSetting, "settings.global")