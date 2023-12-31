const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const user = require("../models/user");
const jwt = require('jsonwebtoken');



// router.post("/signup",(req,res,next)=>{
//     bcrypt.hash(req.body.password,10)
//     .then(hash=>{
//         const user = new User({
//             email: req.body.email,
//             password:hash,
//         });
//         user.save()
//         .then(result=>{
//             res.status(201).json({
//                 message:"User created successfully",
//                 result:result
//             })
//         })
//         .catch(err=>{
//             res.status(500).json({
//                 error:err
//             });
//         });
//     });

// });

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});


// router.post("/login", (req, res, next) => {
//   let fetcheduser;
//   user.find({ email: req.body.email })
//     .then(user => {     
//       if (!user) {
//         return res.status(401).json({
//           message: 'Invalid credentials'
//         })
//       }
//       fetcheduser=user;
//       return bcrypt.compare(req.body.password, user.password)
//     })
//     .then(result => {    
//       if (!result) {
//         return res.status(401).json({
//           message: "invalid Auth failed"
//         })
//       }
//       const token = jwt.sign({ email: fetcheduser.email, userId: fetcheduser._id},
//       'this_is_secret_key',
//       {expiresIn:'36h'}
//       );
//       console.log(token)
//       res.status(200).json({
//         token:token
//       })

//     }).catch(err => {
//       return res.status(401).json({
//         message: "invalid Auth failed"
//       })
//     })
// })
router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });
    });
});




module.exports = router;