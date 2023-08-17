const express = require("express");
 const bodyParser = require("body-parser");
 const Post = require('./models/post')
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');


mongoose.connect("mongodb+srv://murtuzakhadri12:AxgU5HVK70OztZqw@mean-aws.4jritgk.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
  console.log('Connected to MongoDB');
})
.catch(()=>{
  console.log('connection failed');
})

app.use(cors());
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title : req.body.title,
    content  : req.body.content
  });
  post.save().then(createdpost=>{
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdpost._id
    });
  })
 
});

app.get("/api/posts", (req, res, next) => {
 Post.find().then((documents)=>{
  res.status(200).json({
    message: "Posts fetched successfully!",
    posts: documents
  });
 }); 
});


// app.delete("/api/posts/:id",(req,res,next)=>{
// Post.deleteOne({_id:req.params.id}).then((result)=>{
//   console.log(result);
//   res.status(200).json({message:"post deleted"})
// });
// });

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then((results) => {
    console.log(results);
    res.status(200).json({
      message: "Post Deleted..!"
    })
  })
})
module.exports = app;
