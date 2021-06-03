const express = require("express");
const uploadRouter = express();
const multer  = require("multer");
const path = require("path");
const MySqlDatabase = require("../../../modules/database");
const isOwner = require("../../../validition/isSchoolOwner");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
        
      cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
  });
   
const upload = multer({ storage: storage });

uploadRouter.post("/" , isOwner , upload.single("image") , (req , res ,next)=>{
//TODO: not done yet
MySqlDatabase.query(`UPDATE school SET profile = ${MySqlDatabase.escape(req.file.path)} WHERE id = ` , (err , result)=>{
err ? next(err) : res.status(201).json({error : false , message : "profile picture added successfully" , data : result});
});
});