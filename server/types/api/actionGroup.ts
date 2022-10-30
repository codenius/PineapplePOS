import { Schema, model } from "mongoose";

export const ActionGroup = new Schema({
    timestamp: {
        type: Date,
        default: Date.now()
    },
    type: {
        type: ["add", "edit", "recover", "remove", "sell"],
        required: true
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: "employee",
        required: true
    },
})

export default model("ActionGroup", ActionGroup, "action-group")