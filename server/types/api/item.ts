import { Schema, SchemaTypes, Types, isValidObjectId, model } from "mongoose";
import versioning from "mongoose-versioned";
import CategoryModel, { Category, getDefaultCategory } from "./category";
import mongooseAutoPopulate from "mongoose-autopopulate";
import category from "./category";

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
        type: SchemaTypes.Mixed,
        ref: "Category",
        autopopulate: true
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
}, { skipVersioning: { amount: true } })

Item.plugin(versioning, { collection: "items.versioning" })
Item.plugin(mongooseAutoPopulate)

Item.pre("validate", async function (next) {
    if (typeof this.category === 'string') {
        let filter = isValidObjectId(this.category)?{ _id: this.category }:{ name: this.category }
        let existingCategory = await CategoryModel.findOne(filter);

        if (!existingCategory) {
            existingCategory = new CategoryModel({ name: this.category, _isDefault: false });
            await existingCategory.save();
        }

        this.category = existingCategory._id;
    } else if (!this.category || !isValidObjectId(this.category)) {
        this.category = (await getDefaultCategory())._id;
    } 

    next();
});

export default model("Item", Item, "items")