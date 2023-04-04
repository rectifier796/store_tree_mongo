const mongoose=require("mongoose");

const treeSchema=mongoose.Schema({
    value:String,
    children:[]
})

const treeModel=mongoose.model('treeModel',treeSchema);
module.exports=treeModel;