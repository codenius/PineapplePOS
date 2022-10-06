import { Schema, model } from "mongoose";
import { Item } from "./item";


const LoggedItem = new Schema({
    original_item_id: {
        type: Schema.Types.ObjectId, ref: "items"
    }
}).add(Item)

export default model("LoggedItem", LoggedItem, "logged-items")