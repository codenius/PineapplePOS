import { Schema, model } from "mongoose";

const Action = new Schema({
    employee: {
        type: Schema.Types.ObjectId, ref: "employee"
    },
    action_group: {
        type: Schema.Types.ObjectId, ref: "action-group"
    },
    old_item: {
        type: Schema.Types.ObjectId, ref: "logged-item"
    },
    new_item: {
        type: Schema.Types.ObjectId, ref: "logged-item"
    }
})

export default model("Action", Action, "actions")