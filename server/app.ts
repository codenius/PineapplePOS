import { Express, json }  from "express";
import { urlencoded } from "body-parser";
import { inputMiddleware, outputMiddleware } from "./middlewares/io_handler";

const app = Express()

app.use(urlencoded({ extended: true }))
app.use(inputMiddleware)
app.use(json())


/* Routes */
app.get('api', (req,res)=>{
    
    
})

app.get('api/items', (req,res)=>{

    
})

app.post('api/item/new', (req,res)=>{
    
    
})


app.use(outputMiddleware)
app.listen(3000, () => {
    console.log("Backend started")
})