// imports 
const express = require("express");
const bodyparser=require("body-parser");
require("dotenv").config();
const cors = require("cors");//for enabling api requuest from external source
const route=require("./routes/index");
// creating instance for listing on server by express;
const app =express();


// middlewares

//middlewares for using json from body of request and tool like Postman 
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());

//middleware using cors with options
app.use(cors({
    origin: ['http://localhost:3001',"http://localhost:5000","http://localhost:5173"], //change origin based on domain main of the application
    optionsSuccessStatus: 200,
    // credentials: true 
  }
));
//Defining headers for cors
app.use(function(req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })



// routes 
app.use("/api/thaiIDCards",route)


// test route to check if api active status
app.get("/test",(req,res)=>{
    return res.status(200).json({
        msg:"API is live",
        success:true,
    });
})
// catching unknown route endpoint hitting on the server port by browser 
app.get("*",(req,res)=>{
    console.log("unkonwn endpoint hit")
    res.redirect("/test");
})


// error handling Middleware 
app.use((err, req, res, next) => {
  console.error(err.stack);

  // We can Customize the error response based on the type of error
  if (err instanceof SyntaxError && 'body' in err && err.status === 400) {
    // let us Handle JSON body parsing error
    return res.status(400).json({ success:false, error: 'Bad request. Invalid JSON.' });
  }

  // For other types of errors
  res.status(500).json({ success:false,error: 'Something went wrong.' });
});


module.exports=app;