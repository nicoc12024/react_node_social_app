import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getComments = (req, res) => {
  const q = `SELECT c.*, u.id AS userId, name, profilePicture FROM comments AS c JOIN users AS u ON (u.id = c.userId)
   WHERE c.postId = ? ORDER BY c.createdAt DESC`;

  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addComment = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");

    const q =
      "INSERT INTO comments (`description`, `createdAt`, `userId`, `postId`) VALUES (?)";

    const values = [
      req.body.description,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      req.body.postId,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Comment has been created");
    });
  });
};

export const deleteComment = (req, res) => {
  const token = req.cookies.accessToken;
  const commentId = req.params.id;

  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");

    // Optional: Check if the user is the author of the comment
    const checkAuthorQuery = "SELECT userId FROM comments WHERE id = ?";
    db.query(checkAuthorQuery, [commentId], (err, data) => {
      if (err) return res.status(500).json(err);

      // Compare the userId from the comment with the userId from the token
      if (data[0].userId !== userInfo.id) {
        return res.status(403).json("You are not authorized to delete this comment");
      }

      // Delete the comment
      const q = "DELETE FROM comments WHERE id = ?";
      db.query(q, [commentId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Comment has been deleted");
      });
    });
  });
};

export const editComment = (req, res) => {
  const token = req.cookies.accessToken;
  const commentId = req.params.id;

  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token not valid");

    // Optional: Check if the user is the author of the comment
    const checkAuthorQuery = "SELECT userId FROM comments WHERE id = ?";
    db.query(checkAuthorQuery, [commentId], (err, data) => {
      if (err) return res.status(500).json(err);

      // Compare the userId from the comment with the userId from the token
      if (data[0].userId !== userInfo.id) {
        return res.status(403).json("You are not authorized to edit this comment");
      }

      // Update the comment
      const q = "UPDATE comments SET description = ? WHERE id = ?";
      db.query(q, [req.body.description, commentId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Comment has been updated");
      });
    });
  });
};
