import { Schema, model } from "mongoose";

export const ActionGroup = new Schema({
    timestamp: Date,
    type: ["add", "edit", "recover", "remove", "sell"]
})

export default model("ActionGroup", ActionGroup, "action-group")