import { Schema, model } from "mongoose";

export const Item = new Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        min: 0,
        default: 0
    },
    company: {
        type: String,
        default: ""
    },
    category: {
        type: String,
        default: ""
    },
    sell_price: {
        type: Number,
        min: 0,
        default: 0
    },
    buy_price: {
        type: Number,
        min: 0,
        default: 0
    },
    deleted: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        default: ""
    }
})

export default model("Item", Item, "items")