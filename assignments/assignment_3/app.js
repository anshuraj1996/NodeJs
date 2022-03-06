const express = require('express')
const faker = require('faker');
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.set("views","./views")
app.set("views engine","ejs")


app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"));
var users = [];

for(let i = 0; i<5;i++){
    users.push({
        name:faker.name.findName(),
        email: faker.internet.email()
    })
}

// console.log(users)

app.get("/",(req,res)=>{ // create a route using the HTTP GET request to the url/path specified
    res.render("index.ejs",{users})
})

app.get("/form",(req,res)=>{
    res.render("form.ejs")
})

app.post("/user/add",(req,res)=>{
    console.log("adding");
    console.log(req.body);
    users.push({
        name: req.body.name,
        email: req.body.email
    })
    res.redirect("/")
})





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  