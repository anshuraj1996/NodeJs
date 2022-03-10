const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
SECRET = "RESTAPI"

const loginRoutes = require("./routes/login")
const userRoutes = require("./routes/users")
const postRoutes = require("./routes/posts")


const app = express()
const port = 3000

mongoose.connect('mongodb://localhost:27017/assignment_5')



app.use("/posts",(req,res,next)=>{

    var token = req.headers.authorization.split("Bearer ")[1];
    if(!token){
        return res.status(401).json({
            status:"failed",
            message:"token is missing"
        })
    }
    jwt.verify(token,SECRET,function(err,decoded){
        if(err){
            return res.status(401).json({
                status:"failed",
                message:"invalid token"
            })
        }
        else{
            req.user = decoded.data
            next();
        }
    })
})


app.use("/",loginRoutes)
app.use("/users",userRoutes)
app.use("/",postRoutes)






app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  
