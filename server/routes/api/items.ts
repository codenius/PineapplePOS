import ItemController from "../../controllers/api/itemController";
import {Router} from "express";

const itemRouter = Router();

/* Item Router paths using the ItemController */

itemRouter.get('',(req,res)=>{
    /**
     * * Docs: https://github.com/DoctorFuchs/POS/blob/master/docs/api.md#get-apiitems
     */

    res.json(ItemController.get(req,res,(e)=>{res.json({error: e})}))
    
})

itemRouter.post('new',(req,res)=>{
    /**
     * * Docs: https://github.com/DoctorFuchs/POS/blob/master/docs/api.md#post-apiitemnew
     */

    const i = ItemController.create(req,res,(e)=>{res.json({error: e})})

    res.json(i)

})

export default itemRouter