const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
console.log(date);


const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const items  = ["Buy food", "Cook food", "Eat food"];
const workItems = [];

app.get("/", function(req,res){    
    const day = date.getDate();    
    res.render("list", {userItems: items, listTitle: day});;
})

app.post("/", function(req, res){
    const item = req.body.userItem;
    
    if (req.body.list == "Work List") {
        workItems.push(item);
        res.redirect("/work")
    } else {
        items.push(item);
        res.redirect("/");
    }    
    
})

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", userItems: workItems});
})

app.get("/about", function(req, res) {
    res.render("about")
})

app.listen(3000, function(){
    console.log("Server is running");
    
})