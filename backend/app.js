const path = require("path")
const express = require("express");
 const bodyParser = require("body-parser"); 
const mongoose = require("mongoose");


const PostRoutes = require("./routes/posts");








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
//app.use("/images,",express.static(path.join("backend/images")))
app.use("/images", express.static(path.join("backend/images")));






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

app.use("/api/posts",PostRoutes);
module.exports = app;
