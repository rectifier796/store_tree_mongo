const express = require("express");
const mongoose = require("mongoose");

const treeModel = require("./treeModel");

require("dotenv").config();

let bfs=[];
let queue=[];

const app = express();


app.use(express.json());

const db_link = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.zsjyksv.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("Database Connected");
  })
  .catch(function (err) {
    console.log(err);
  });

//storeTree();

app.get("/bfs", async(req, res) => {
  const start=req.body.startNode;

  try{
  const startNode=await treeModel.find({value:start});
  if(startNode.length!=0){


    queue.push(startNode[0].value);
    
    let i=0;
    while(i<queue.length){
 
        var temp=await treeModel.find({value:queue[i]});

        if(temp[0].children[0]!=null)
        queue.push(temp[0].children[0]);

        if(temp[0].children[1]!=null)
        queue.push(temp[0].children[1]);

        bfs.push(queue[i]);

        i++;




    }


    res.json({
        message:bfs
    });


  }else{
    res.json({
        message:"Start Node not found!!!"
    })
  }
  }
  catch(err){
    res.json({
        message:"Error Occured",
        error:err.message
    })
  }
});

//Function to store tree in mongo database
async function storeTree() {
  const tree = [
    {
      value: "1",
      children: ["2", "3"],
    },
    {
      value: "2",
      children: ["4", "5"],
    },
    {
      value: "3",
      children: ["6", "7"],
    },
    {
      value: "4",
      children: [null, null],
    },
    {
      value: "5",
      children: [null, null],
    },
    {
      value: "6",
      children: [null, null],
    },
    {
      value: "7",
      children: [null, null],
    },
  ];
  tree.map(async(e)=>{
   await treeModel.create(e);
    })
}

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
