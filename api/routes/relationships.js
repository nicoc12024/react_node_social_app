import express from "express";
import {
  getRelationships,
  getAllRelationshipsForCurrentUser,
  addRelationship,
  deleteRelationship,
} from "../controllers/relationship.js";

const router = express.Router();

router.get("/", getRelationships);
router.get("/relationships-for-current-user", getAllRelationshipsForCurrentUser);
router.post("/", addRelationship);
router.delete("/", deleteRelationship);

export default router;
