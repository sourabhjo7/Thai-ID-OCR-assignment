// imports 
const express = require("express");
const bodyparser=require("body-parser");
require("dotenv").config();

// creating instance for listing on server by express;
const app =express();


// middlewares
//middlewares for using json from body of request and tool like Postman 
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());








// test route to check if api active status
app.get("/test",(req,res)=>{
    return res.status(200).json({
        msg:"API is live",
        success:true,
    });
})


// listening on server 
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`server is running on port==>`, PORT);
})