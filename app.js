const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const date=require(__dirname+"/date.js");
const port=3000;
const app=express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
// var items=["buy rice","cook rice","eat rice  "];
// let workItems=[];
  
mongoose.connect("mongodb://0.0.0.0:27017/todoListDB",{useNewUrlParser:true})

const itemSchema= mongoose.Schema({
    name:String
});

const itemModel=mongoose.model("itemModel",itemSchema);

const item1=new itemModel({
    name:"haircut"
});
const item2=new itemModel({
    name:"sleep"
});
const item3=new itemModel({
    name:"facewash"
});

const defaultitems=[item1,item2,item3]

itemModel.insertMany(defaultitems).then(function(data){
    console.log("yes");
}).catch(function(err){
    console.log(err);
});

app.get('/',(req,res)=>{
    let day=date.getDate();
    res.render("list",{listTitle:"today",newListItems:items});
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