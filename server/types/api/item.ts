import { Schema, SchemaTypes, Types, isValidObjectId, model } from "mongoose";
import versioning from "mongoose-versioned";
import CategoryModel, { Category } from "./category";
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
        let existingCategory = await CategoryModel.findOne({ name: this.category });

        if (!existingCategory) {
            existingCategory = new CategoryModel({ name: this.category, _isDefault: false });
            await existingCategory.save();
        }

        this.category = existingCategory._id;
    } else if (!this.category || !isValidObjectId(this.category)) {
        let default_category_filter = {name: "--", _isDefault: true}
        let default_category = await CategoryModel.findOne(default_category_filter);

        if (!default_category) {
            default_category = new CategoryModel(default_category_filter);
            await default_category.save();
        }
        this.category = default_category._id;
    } 

    next();
});

Item.post("findOneAndDelete", async function (doc) {
    if (!doc.category) return

    const itemModel = model("Item")
    const count = await itemModel.countDocuments({ category: category}) 

    if (count !== 0) return

    await CategoryModel.findByIdAndDelete(doc.category)
})


export default model("Item", Item, "items")