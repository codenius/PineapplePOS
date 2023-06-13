import { Schema, model } from "mongoose";
import itemModel from "./item";
import InputError from "../errors/inputError";

export const Sell = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        ref: "Item",
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    price: {
        type: Number,
        min: 0,
        default: (doc) => {
            //@ts-ignore
            return itemModel.findById(doc.id).lean().sell_price
        },
        immutable: true
    },
    date: {
        type: Date,
        default: Date.now,
        immutable: true
    }
})

Sell.post("save", (doc) => {
    itemModel.findByIdAndUpdate(doc.id, {$inc: {amount: -1*doc.amount}}).exec()
})

export default model("Sell", Sell, "sells")