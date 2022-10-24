import { Schema, model } from "mongoose";

export const ActionGroup = new Schema({
    timestamp: Date,
    type: ["add", "edit", "recover", "remove", "sell"],
    employee: {
        type: Schema.Types.ObjectId, ref: "employee"
    },
})

export default model("ActionGroup", ActionGroup, "action-group")