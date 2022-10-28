import { Schema, model } from "mongoose";

export const Employee = new Schema({
    first_name: String,
    last_name: String,
    created: Date,
    level: ["read", "sell", "edit", "admin"],
    password: String
})

export default model("Employee", Employee, "employees")