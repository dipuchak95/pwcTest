/*
Make an API to Upload Images
Filename: original name+ date+ time 
*/

const multer = require("multer");
const express = require("express");
const bodyParser = require("body-parser");
const fileRoute = require("./routes/fileRouter");
const path = require("path");

const app = express();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    let originalName = file.originalname.split(".")[0];

    var currentdate = new Date();
    var datetime =
      currentdate.getDate() +
      "_" +
      (currentdate.getMonth() + 1) +
      "_" +
      currentdate.getFullYear() +
      " " +
      currentdate.getHours() +
      "_" +
      currentdate.getMinutes() +
      "_" +
      currentdate.getSeconds();

    cb(null, originalName +" "+datetime+ "." + extension);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use("/images", express.static(path.join(__dirname, "images")));
app.use(bodyParser.json());
app.use(multer({ storage: storage, fileFilter: fileFilter }).single("image"));

app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "Options, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api", fileRoute);

app.listen(3000);
