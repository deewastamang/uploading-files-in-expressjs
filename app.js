require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const dbConnect = require("./db/connect");
const UploadModel = require("./model/uploadFile");

const multer = require("multer");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.get("/", (req, res) => {
  res.status(200).send("<h1>Hi, Welcome to this project</h1>");
});

app.post("/api/upload", upload.single("file"), async (req, res) => {
  const fileToSave = new UploadModel({
    filename: req.file.originalname,
    path: req.file.path,
  });

  await fileToSave.save();
  res.status(200).send(req.file);
});

app.post("/api/uploads", upload.array("files", 12), async (req, res) => {
  const filesTosave = req.files.map((item) => {
    return new UploadModel({
      filename: item.originalname,
      path: item.path,
    });
  });

  await filesTosave.map((item) => item.save());
  res.status(200).send(req.files);
});

app.listen(process.env.PORT, async () => {
  try {
    await dbConnect(process.env.DATABASE_URI);
    console.log(`Server is listening at port ${process.env.PORT}...`);
  } catch (err) {
    console.log("error on connecting to the server", err.message);
  }
});
