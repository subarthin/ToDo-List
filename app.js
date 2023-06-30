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
const workitemModel=mongoose.model("workitemModel",itemSchema);

const item1=new itemModel({
    name:"subarthin"
});
const item2=new itemModel({
    name:"loves"
});
const item3=new itemModel({
    name:"webdev"
});

const defaultitems=[item1,item2,item3]



// itemModel.find().then(function(data){
//     console.log(data);
// }).then(function(err){
//     console.log(err);
// });


app.get('/',(req,res)=>{
    let day=date.getDate();
    itemModel.find().then(function(data){
        if(data.length===0){
            itemModel.insertMany(defaultitems).then(function(data){
                console.log("yes");
                res.redirect('/');
            }).catch(function(err){
                console.log(err);
            });
        }else{
        res.render("list",{listTitle:day,newListItems:data});
        }
    }).then(function(err){
        console.log(err);
    });
    
});

app.post("/", function(req, res) {
    let itemName=req.body.newItem;
    
    if(req.body.list==="Work"){ 
        const witem=new workitemModel({
            name:itemName
        });
        witem.save();
        res.redirect("/work");
    }else{
        const item=new itemModel({
            name:itemName
        });
        item.save();}
        res.redirect("/");
});

app.post("/delete",function(req,res){
    const checkedItem=req.body.checkbox;
    if(req.body.list==="Work"){ 
        workitemModel.findByIdAndRemoove(checkedItem).then(function(data){
            console.log("removed");
        }).catch(function(err){
            console.log(err);
        })
        res.redirect("/work");
    }else{
        itemModel.findByIdAndRemove(checkedItem).then(function(data){
            console.log("removed");
        }).catch(function(err){
            console.log(err);
        })
        res.redirect("/");
    }
});

app.get("/work",(req,res)=>{
    workitemModel.find().then(function(data){
        if(data.length===0){
            workitemModel.insertMany(defaultitems).then(function(data){
                console.log("yes");
                res.redirect('/');
            }).catch(function(err){
                console.log(err);
            });
        }else{
        res.render("list",{listTitle:"Work",newListItems:data});
        }
    }).then(function(err){
        console.log(err);
    });
});

app.post("/work",(req,res)=>{
    
    res.redirect("/work");
});

app.get("/about",(req,res)=>{
    res.render("about");
});
app.listen(port,()=>{
    console.log("Server running at port 3000");
});