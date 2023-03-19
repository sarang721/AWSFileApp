const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const app = express();
const protect = require("./authMiddleware.js");
const multer = require("multer");
const AWS = require("aws-sdk");
const fs = require("fs");
const upload = multer({ dest: "uploads/" });
const path = require("path");
const os = require("os");

require("dotenv").config();

AWS.config.update({
  secretAccessKey: process.env.SECRET_KEY_ACCESS,
  accessKeyId: process.env.ACCESS_KEY,
});

const s3 = new AWS.S3();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("DB connected");
  } catch (e) {
    console.log("Failed to connect to MongoDB, error ", e);
    process.exit(1);
  }
};

connectDB();
app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);

app.get("/getfiles", protect, async (req, res) => {
  try {
    const files = await s3.listObjectsV2({
        Bucket: process.env.BUCKET_NAME,
        Prefix: `${req.user._id}/`,
      }).promise();

    var names = files.Contents.map((item) =>
      item.Key.toString().substring(item.Key.toString().indexOf("/") + 1)
    ).filter((val) => val.length > 0);

    res.send(names);
  } catch (err) {
    res.send(400).json({
      message: "Error Occured while getting files",
    });
  }
});

app.post("/uploadfile", upload.single("file"), protect, async (req, res) => {
  var file = req.file;
  try {
    const uploadFile = (file) => {
      const fileStream = fs.createReadStream(file.path);
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: `${req.user._id}/${file.originalname}`,
        Body: fileStream,
      };
      s3.upload(params, () => {});
    };
    uploadFile(file);
    res.send(200);
  } catch (err) {
    res.send(400).json({
      message: "Problem Occured while Uploading",
    });
  }
});

app.post("/download", protect, async (req, res) => {
  try {
    const filename = req.body.filename;
    console.log("Trying to download file", filename);

    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: `${req.user._id}/${filename}`,
    };

    let readStream = s3.getObject(params).createReadStream();
    let writeStream = fs.createWriteStream(
      path.join(`${os.homedir()}\\Desktop\\S3Downloads`, filename)
    );
    readStream.pipe(writeStream);
    
    res.send(`File Downloaded to ${os.homedir()}\\Desktop\\S3Downloads`);
  } catch (err) {
    res.send(400).json({
      message: "Error occured while downloading",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running");
});
