import Comment from "../models/Comment.js";

export const getCommentsByVideo = async (req, res) => {
  const comments = await Comment.find({ videoId: req.params.videoId });
  res.json(comments);
};

export const addComment = async (req, res) => {
  const comment = await Comment.create({
    ...req.body,
    userId: req.userId
  });
  res.status(201).json(comment);
};

export const deleteComment = async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id);
  res.json({ message: "Comment deleted" });
};
