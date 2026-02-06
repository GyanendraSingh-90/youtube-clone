import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getCommentsByVideo,
  addComment,
  deleteComment
} from "../controllers/commentController.js";

const router = express.Router();

router.get("/:videoId", getCommentsByVideo);
router.post("/", authMiddleware, addComment);
router.delete("/:id", authMiddleware, deleteComment);

export default router;
