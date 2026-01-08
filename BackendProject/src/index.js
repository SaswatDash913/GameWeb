import {app} from './app.js'
import dotenv from "dotenv";
import connectDataBase from "./db/index.js";

dotenv.config({
    path:"./env"
})

connectDataBase()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is running on ${process.env.PORT}`)
    })

})
.catch((error)=>{
    console.log("ERROR : ",error)
})