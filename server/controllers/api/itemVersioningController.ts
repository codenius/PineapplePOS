import mongoose, { Model, Types } from "mongoose";
import SimpleController from "../simpleController";

export default new SimpleController(mongoose.model("items.versioning"))