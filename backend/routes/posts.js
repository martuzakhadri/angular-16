const express = require("express")
const router = express.Router();
const Post = require('../models/post')
const multer = require("multer")

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': "jpg",
  "image/gpg": 'jpg'
}

// const storage = multer.diskStorage({
//   destination:(req,file,cb)=>{
//     const isvalid= MIME_TYPE_MAP[file.mimetype];
//     let error = new error("invalid mime type");
//     if(isvalid){
//       error =null;
//     }
//     cb(null,"backend/images");;
//   },
//   filename:(req,file,cb)=>{
//     const name= file.originalname.toLowerCase().split('').join('-');
//     const ext = MIME_TYPE_MAP[file.mimetype];
//     cb(null,name+'-'+Date.now()+'.'+ext);

//   }
// })
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});



// router.post("",multer({storage:storage}).single("image"), (req, res, next) => {
//   const url = req.protocol +'://'+req.get("host");
//     const post = new Post({
//       title : req.body.title,
//       content  : req.body.content,
//       imagePath: url+"/images/"+req.file.filename
//     });
//     post.save().then(createdpost=>{
//       res.status(201).json({
//         message: 'Post added successfully',
//         post:{
//           ...createdpost,
//           id:createdpost._id,
//           // title:createdpost.title,
//           // content:createdpost.content,
//           // imagePath:createdpost.imagePath
//         }
//       });
//     })

//   });

router.post("", multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + "/images/" + req.file.filename
    });
    post.save().then(createdPost => {
      res.status(201).json({
        message: "Post added successfully",
        post: {
          ...createdPost,
          id: createdPost._id
        }
      });
    });
  }
);



// router.get("", (req, res, next) => {
//   const pagesize = +req.query.pagesize;
//   const currentpage = +req.query.page;
//   const postquery = Post.find;
//   if (currentpage && pagesize) {
//     postquery.skip(pagesize * (currentpage - 1)).limit(pagesize);
//   }
//   postquery.find().then((documents) => {
//     res.status(200).json({
//       message: "Posts fetched successfully!",
//       posts: documents
//     });
//   });
// });

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Post.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: fetchedPosts,
        maxPosts: count
      });
    });
});


router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((results) => {
    console.log(results);
    res.status(200).json({
      message: "Post Deleted..!"
    })
  })
})


module.exports = router;