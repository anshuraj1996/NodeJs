const express = require('express');
const bodyParser = require('body-parser');
const User = require('./model/users');
const methodOverride = require('method-override');
const mongoose = require('mongoose');



const app = express()
const port = 3000
mongoose.connect('mongodb://localhost:27017/assignment_4')


app.set("views","./views")
app.set("views engine","ejs")
// during runtime template engine replaces the variables in templte file to actual values and transforms the template file to html file and sends it to client
// to render the template files create views directory which stores all the template files
// 2nd line decides which engine to use. engine name is given as 2nd argument.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"));
app.use(methodOverride('_method'))


// console.log(users);
app.get("/", async (req,res)=>{ // create a route using the HTTP GET request to the url/path specified
    const users = await User.find()
    res.render("index.ejs",{users})
})

app.get("/form",(req,res)=>{
    res.render("form.ejs")
})

app.post("/users/add",async (req,res)=>{
    console.log(req.body);
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        isPromoted: req.body.isPromoted
    })
    console.log(user);
    res.redirect("/")
})

app.put("/users/:id",async(req,res)=>{
    await User.updateOne({_id:req.params.id},[
        { $set: { isPromoted: { $not: "$isPromoted" } } }
      ])
      console.log("updated");
      res.redirect("/")
})

app.delete("/users/:id",async(req,res)=>{
    await User.deleteOne({_id:req.params.id})
    console.log("deleted");
    res.redirect("/")
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  