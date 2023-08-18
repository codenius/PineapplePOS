import categoryModel from "../../types/api/category";
import ControllerChild from "../controllerChild";
import SimpleController from "../simpleController";
import ItemModel from "../../types/api/item";

export const CategoryController = new SimpleController(categoryModel)

const CategorySelectController = new ControllerChild(CategoryController, [], [], [
    async (req, res) => {
        let filter = req.body || {}
        let items = await ItemModel.find(filter).lean({ autopopulate: true })
        let categories = items.map((item) => item.category)
        return categories.filter((item, index) => categories.indexOf(item) === index && item!=null)
    }
])

export { CategorySelectController }
