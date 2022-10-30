import { Schema, model } from "mongoose";

const Action = new Schema({
    action_group: {
        type: Schema.Types.ObjectId,
        ref: "action-group",
        required: true
    },
    old_item: {
        type: Schema.Types.ObjectId,
        ref: "logged-item",
        required: true
    },
    new_item: {
        type: Schema.Types.ObjectId,
        ref: "logged-item",
        required: true
    }
})

export default model("Action", Action, "actions")