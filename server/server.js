const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require("./routes/userRoutes")
const app = express();
const dotenv = require('dotenv')
const protect=require('./authMiddleware.js');
const User=require('./models/user');
const multer = require('multer');
const randomstring = require("randomstring");
const AWS=require('aws-sdk');
const fs=require('fs');

require('dotenv').config()

AWS.config.update({
    secretAccessKey:process.env.SECRET_KEY_ACCESS,
    accessKeyId: process.env.ACCESS_KEY,
   

});

const s3 = new AWS.S3();

const connectDB=async()=>{

    try{

        const conn=await mongoose.connect(process.env.MONGO_URL,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })

        console.log("DB connected");
    }

    catch(e){

        console.log(e);
        process.exit(1);

    }


}

connectDB();
app.use(cors())
app.use(express.json())

app.use("/users", userRoutes);

app.get('/getfiles',protect,async(req,res)=>{

    const user=await User.find({_id:req.user._id});
    const bucket_name=user[0].bucket_name;


    const files=await s3.listObjectsV2({Bucket:bucket_name}).promise();
    //console.log(files.Contents);
    const names=files.Contents.map((item)=>item.Key);
    res.send(names);
    
})  


const putbucketCors=async(bucketname)=>{
   await s3.putBucketCors(
        {
         Bucket: bucketname,
         CORSConfiguration: {
          CORSRules: [
            {
                AllowedHeaders: [
                    "*"
                ],
                AllowedMethods: [
                    "GET",
                    "PUT",
                    "POST",
                    "DELETE"
                ],
                AllowedOrigins: [
                    "*"
                ],
                ExposeHeaders: [
                    "x-amz-server-side-encryption",
                    "x-amz-request-id",
                    "x-amz-id-2"
                ],
                MaxAgeSeconds: 3000
            }
          ]
         }
        },
        err => {
         if (err) console.log(err, err.stack);
         else console.log(`Edit Bucket CORS succeed!`);
        }
    )
}

const updateDocument=async(id)=>{

    const bucketName=randomstring.generate({
        length: 12,
        charset: 'abcdefghijklmnopqrstuvwxyz'
        });   
        
        
        const params={
            Bucket:bucketName
        }


        try{
        const promise=await User.updateOne({_id:id},{

            $set:{
                bucket:true,
                bucket_name:bucketName
            }
        })
        }
        catch(err)
        {
            return res.status(500).send();
        }
        try{
        await s3.createBucket(params,(err,data )=>{
                    if(err)
                    {
                        console.log(err);
                    }
                    else{
                        console.log("Bucket created");
                    }
                })

            }
            catch(err)
            {
                return res.status(500).send();
            }

}

app.get("/uploadfile",protect,async(req,res)=>{
    const user=await User.find({_id:req.user._id});
    if(user[0].bucket==false){
    updateDocument(req.user._id);
    
    }
    putbucketCors(user[0].bucket_name);
  
    res.json({
        "bucket_name":user[0].bucket_name
    })
    

})



app.post("/download",protect,async(req,res)=>{
    const user=await User.find({_id:req.user._id});
    const bucket_name=user[0].bucket;
    const fileName=req.body;

    let x=s3.getObject({Bucket:bucket_name}).promise();
    console.log(x.body);
    res.send(x.body);

})

app.listen(5000,()=>{
    console.log("Server running");
  })
  




