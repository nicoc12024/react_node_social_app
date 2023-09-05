import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

export const register = (req, res) => {
  // Check if user already exists
  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Email already exists");

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    // Define paths for default and user-specific images
    const profilePicturePath = "profilePicture.jpg";
    const coverPicturePath = "coverPicture.jpg";

    // Create user
    const q =
      "INSERT INTO users (email, password, name, profilePicture, coverPicture ) VALUES (?, ?, ?, ?, ?)";
    db.query(
      q,
      [
        req.body.email,
        hashedPassword,
        req.body.name,
        profilePicturePath,
        coverPicturePath,
      ],
      (err, result) => {
        if (err) return res.status(500).json(err);

        const userId = result.insertId;
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const userFolder = path.join(__dirname, `../../client/public/upload/${userId}`);

        if (!fs.existsSync(userFolder)) {
          try {
            fs.mkdirSync(userFolder, { recursive: true });
          } catch (error) {
            return res.status(500).json("Error creating user folder");
          }
        }

        // Define paths for default and user-specific images
        const profilePicturePath = path.join(userFolder, "profilePicture.jpg");
        const coverPicturePath = path.join(userFolder, "coverPicture.jpg");

        const defaultProfilePicture = path.join(
          __dirname,
          "../../client/public/defaultUserImages/defaultProfilePicture.jpg"
        );
        const defaultCoverPicture = path.join(
          __dirname,
          "../../client/public/defaultUserImages/defaultCoverPicture.jpg"
        );

        if (
          !fs.existsSync(defaultProfilePicture) ||
          !fs.existsSync(defaultCoverPicture)
        ) {
          console.error(
            `File(s) not found: ${defaultProfilePicture} ${defaultCoverPicture}`
          );
          return res.status(500).json("Default pictures not found");
        }

        fs.copyFileSync(defaultProfilePicture, profilePicturePath);
        fs.copyFileSync(defaultCoverPicture, coverPicturePath);

        return res.status(200).json("User created");
      }
    );
  });
};

export const login = async (req, res) => {
  // Check if user exists
  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json("Internal server error");
    }
    if (!data.length) return res.status(404).json("User not found");

    // Check if password is correct
    const validPassword = bcrypt.compareSync(req.body.password, data[0].password);
    if (!validPassword) return res.status(400).json("Wrong password or email");

    // Create and assign a token
    const token = jwt.sign({ id: data[0].id }, process.env.SECRET_KEY);
    const { password, ...info } = data[0];

    // Send token in cookie
    res.cookie("accessToken", token, { httpOnly: true }).status(200).json(info);
  });
};

export const logout = async (req, res) => {
  // Clear cookie with token
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("Logged out");
};
