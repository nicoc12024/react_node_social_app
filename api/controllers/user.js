import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getAllUsers = (req, res) => {
  const q = "SELECT * FROM users";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    const users = data.map((user) => {
      const { password, ...info } = user;
      return info;
    });

    return res.json(users);
  });
};

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id = ?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");

    const q =
      "UPDATE users SET `name` = ?, `city` = ?, `website` = ?, `profilePicture` = ?, `coverPicture` = ? WHERE id = ?";

    db.query(
      q,
      [
        req.body.name,
        req.body.city,
        req.body.website,
        req.body.profilePicture,
        req.body.coverPicture,
        userInfo.id,
      ],
      (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0) return res.status(200).json("User has been updated");
        return res.status(403).json("You can update only your account");
      }
    );
  });
};
