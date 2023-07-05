import { Schema, model } from "mongoose";
import passwordLocalMongoosePlugin from "passport-local-mongoose";

export const Employee = new Schema({
    username: String,
    password: String,
    created: {
        type: Date,
        default: Date.now(),
        immutable: true
    },
    level: {
        type: String,
        required: true,
        default: "read"
    }
})

Employee.plugin(passwordLocalMongoosePlugin)


Employee.set("toJSON", {
    transform: function(doc, ret, options) {
        delete ret["hash"]
        delete ret["salt"]
        return ret;
    }
});


export default model("Employee", Employee, "employees")