import { Schema, model } from "mongoose";

const Transaction = new Schema({
    type: ["add", "edit", "recover", "remove", "sell"],
    timestamp: Date,
    old_item: {
        type: Schema.Types.ObjectId, ref: "logged-item"
    },
    new_item: {
        type: Schema.Types.ObjectId, ref: "logged-item"
    }
})

export default model("Transaction", Transaction, "transactions")