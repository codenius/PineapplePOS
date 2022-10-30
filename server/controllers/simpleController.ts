import {FilterQuery, Model, Types} from "mongoose";
import InputError from "../types/errors/inputError";
import DatabaseError from "../types/errors/databaseError";

class SimpleController {
    model: Model<any>

    constructor(model: Model<any>) {
        this.model = model
    }

    /* Controller function to get all object of this type*/
    get(req, res, filter: FilterQuery<any> = {"deleted": false}) {
        this.model.find(filter).exec().then(
            r => res.json(r),
            r => { throw new DatabaseError() }
        )
    }

    /* Controller function to get a single object */
    getSingle(req, res) {
        SimpleController.validateId(req.params.id)
        this.model.findById(req.params.id).exec().then(r => res.status(200).json(r))
    }

    /* Controller function to edit the given object */
    edit(req, res, filter: FilterQuery<any> = {"deleted": false}) {
        if (!Array.isArray(req.body)) {
            throw new TypeError("request body is not a list")
        }
        req.body.forEach(item => {
            this.model.findByIdAndUpdate(item._id, item).where(filter).exec().catch(
                r => { throw new DatabaseError() }
            )
        })
    }

    editSingle(req, res) {
        SimpleController.validateId(req.params.id)
        this.model.findByIdAndUpdate(req.params.id, this.cast(req.body)).exec().catch(
            r => { throw new DatabaseError() }
        )
    }

    delete(req, res, filter: FilterQuery<any> = {"deleted": false}) {
        if (!Array.isArray(req.body)) {
            throw new TypeError("request body is not a list")
        }
        req.body.forEach(item => {
            this.model.findByIdAndUpdate(item._id, {"deleted": true}).where(filter).exec().catch(
                r => { throw new DatabaseError() }
            )
        })
    }

    deleteSingle(req, res) {
        SimpleController.validateId(req.params.id)
        this.model.findByIdAndUpdate(req.params.id, {"deleted": true}).exec().catch(
            r => { throw new DatabaseError() }
        )
    }

    recover(res, req) {
        if (!Array.isArray(req.body)) {
            throw new TypeError("request body is not a list")
        }
        req.body.forEach(item => {
            this.model.findByIdAndUpdate(item._id, {"deleted": false}).exec().catch(
                r => { throw new DatabaseError() }
            )
        })
    }

    recoverSingle(req, res) {
        SimpleController.validateId(req.params.id)
        this.model.findByIdAndUpdate(req.params.id, {"deleted": false}).exec().catch(
            r => { throw new DatabaseError() }
        )
        res.status(200)
    }

    create(req, res) {
        let item = new this.model(this.cast(req.body))
        item.save().catch(
            r => { throw new DatabaseError() }
        )
        res.send(item)
    }

    public static validateId(id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new InputError("invalid ID for an item: "+id)
        }
        return id
    }

    /* Cast a plain object to the schema of the given mongoose model */
    private cast(obj: object) {
        let casted = new this.model(obj)
        let err = casted.validateSync()
        if (err) {throw new InputError(err._message)}
        return casted
    }
}

export default SimpleController