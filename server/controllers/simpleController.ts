import { Model, Types } from "mongoose";

class SimpleController {
    model: Model<any>

    constructor(model: Model<any>) {
        this.model = model
    }

    /* Controller function to get all object of this type*/
    get(req, res, next) {
        try {
            let order = {}
            let order_attribute, order_mode = new RegExp("([_a-z]+):(asc|desc)")
                .exec(req.querys.orderby.toLocaleLowerCase()) || ["", "name", "asc"]
                .slice(1, 2)

            order[order_attribute] = order_mode
            this.model.find().sort(order).exec().then(r => res.status(200).json(r))
        } catch (e) {
            next(e)
        }
    }

    /* Controller function to get a single object */
    getSingle(req, res, next) {
        try {
            if (!Types.ObjectId.isValid(req.params.id)) {
                return res.status(422).json({error_type: "InputError", msg: "Invalid Item ID: "+req.params.id})
            }
            this.model.findById(req.params.id).exec().then(r => res.status(200).json(r))
        } catch (e) {
            next(e)
        }
    }

    /* Controller function to edit the given object */
    edit(req, res, next) {
        try {
            if (!Types.ObjectId.isValid(req.params.id)) {
                return res.status(422).json({error_type: "InputError", msg: "Invalid Item ID: "+req.params.id})
            }
            this.model.findByIdAndUpdate(req.params.id, this.cast(req.body)).exec().then(
                r => res.status(200).json(r),
                r => res.status(422).json({error_type: "Unknown Database Error", msg: "If you see this error msg, please report it to our github"})
            )
        } catch (e) {
            next(e)
        }
    }

    editSingle(req, res, next) {

    }

    delete(req, res, next) {

    }

    create(req, res, next) {

    }

    /* Cast a plain object to the schema of the given mongoose model */
    private cast(obj: object): object {
        let casted_obj = {}
        this.model.schema.eachPath((path, type) => {
            if (!obj[path]) {
                if (!type.default && type.isRequired) {
                    throw new Error(`Incomplete Input: ${path} is required, has no default and it's not given`)
                }
                casted_obj[path] = type.default || null
            } else {
                if (type.isRequired && !type.validate(obj[path])) {
                    throw new Error(`Incorrect Input: ${path} got a invalid input (${obj[path]})`)
                }
                casted_obj[path] = type.validate(obj[path])?obj[path]:null
            }
        })
        return casted_obj
    }
}

export default SimpleController