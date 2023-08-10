import { Schema, model } from "mongoose";

export const Category = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    _isDefault: {
        type: Boolean,
        immutable: true,
        default: false
    }
})

export default model("Category", Category, "categories")