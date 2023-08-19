const express = require("express")
const router = express.Router();
const Post = require('../models/post')





router.post("", (req, res, next) => {
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
  
  router.get("", (req, res, next) => {
   Post.find().then((documents)=>{
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
   }); 
  });
  
  
  // router.delete("/api/posts/:id",(req,res,next)=>{
  // Post.deleteOne({_id:req.params.id}).then((result)=>{
  //   console.log(result);
  //   res.status(200).json({message:"post deleted"})
  // });
  // });
  
  router.delete("/:id", (req, res, next) => {
    Post.deleteOne({_id: req.params.id}).then((results) => {
      console.log(results);
      res.status(200).json({
        message: "Post Deleted..!"
      })
    })
  })

  module.exports = router;