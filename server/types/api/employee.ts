import { Schema, model } from "mongoose";

export const Employee = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    },
    level: {
        type: ["read", "sell", "edit", "admin"],
        required: true,
        default: "read"
    },
    password: {
        type: String,
        required: true
    }
})

export default model("Employee", Employee, "employees")