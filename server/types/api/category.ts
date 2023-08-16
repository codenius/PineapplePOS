import { Query, Schema, model } from "mongoose";

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

let CategoryModel = model("Category", Category, "categories")

export async function getDefaultCategory(): Promise<typeof Query | any> {
    let default_category_filter = { name: "--", _isDefault: true }
    let default_category = await CategoryModel.findOne(default_category_filter);

    if (!default_category) {
        default_category = new CategoryModel(default_category_filter);
        await default_category.save();
    }
    return default_category
}

export default CategoryModel