import express from "express";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import likeRoutes from "./routes/likes.js";
import commentRoutes from "./routes/comments.js";
import relationshipRoutes from "./routes/relationships.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";

import path from "path";

const app = express();
dotenv.config();

// Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());

// Profile and cover picture upload from profile page
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Extract user ID from the filename
    const userId = file.originalname.split("_")[0];
    // Define the destination using the existing folder
    const dest = path.join("../client/public/upload", userId);
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    // Extract type from the filename
    const type = file.originalname.split("_")[1];
    // Use "profile" or "cover" based on the extracted type
    cb(null, type + path.extname(file.originalname));
  },
});
// upload.single("file") is the middleware that handles the file upload
const upload = multer({ storage: storage });
// The endpoint that handles the file upload
app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

// Image upload from share component in home page
const postStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dest = path.join("../client/public/upload");
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Using the original filename
  },
});
// upload.single("file") is the middleware that handles the file upload
const postUpload = multer({ storage: postStorage });
// The endpoint that handles the file upload
app.post("/api/upload/post", postUpload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/relationships", relationshipRoutes);

app.listen(8800, () => console.log("Example app listening on port 8800!"));
