import { Schema, model } from "mongoose";

export const Item = new Schema({
    name: String,
    amount: Number,
    sell_price: Number,
    buy_price: Number,
    deleted: Boolean,
    image: String
})

export default model("Item", Item, "items")