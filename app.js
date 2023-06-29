const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const date=require(__dirname+"/date.js");
const port=3000;
const app=express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
var items=["buy rice","cook rice","eat rice  "];
let workItems=[];

mongoose.connect("mongodb://0.0.0.0:27017/todoListDB",{useNewUrlParser:true})

const itemSchema= mongoose.Schema{
    name:String
};

const itemModel=mongoose.Model("itemModel",itemSchema);


app.get('/',(req,res)=>{
    let day=date.getDate();
    res.render("list",{listTitle:day,newListItems:items});
});

app.post("/", function(req, res) {
    let item=req.body.newItem;
    if(req.body.list==="Work"){ 
        workItems.push(item);
        res.redirect("/work");
    }else{
    items.push(item);}
    res.redirect("/");
});

app.get("/work",(req,res)=>{
    res.render("list",{listTitle:"Work",newListItems: workItems})
})

app.post("/work",(req,res)=>{
    
    res.redirect("/work");
})

app.get("/about",(req,res)=>{
    res.render("about");
})
app.listen(port,()=>{
    console.log("Server running at port 3000");
})