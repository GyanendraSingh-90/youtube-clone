import Video from "../models/Video.js";
import Channel from "../models/Channel.js";

export const getAllVideos = async (req, res) => {
  const { search, category } = req.query;

  let filter = {};

  //  Search by title
  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  //  Filter by category
  if (category && category !== "All") {
    filter.category = category;
  }

  const videos = await Video.find(filter);
  res.json(videos);
};


export const getVideoById = async (req, res) => {
  const video = await Video.findById(req.params.id);
  res.json(video);
};

export const createVideo = async (req, res) => {
  const video = await Video.create({
    ...req.body,
    uploader: req.userId
  });

  await Channel.findByIdAndUpdate(req.body.channelId, {
    $push: { videos: video._id }
  });

  res.status(201).json(video);
};

export const updateVideo = async (req, res) => {
  const video = await Video.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(video);
};

export const deleteVideo = async (req, res) => {
  await Video.findByIdAndDelete(req.params.id);
  res.json({ message: "Video deleted" });
};

//  LIKE VIDEO
export const likeVideo = async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (!video) {
    return res.status(404).json({ message: "Video not found" });
  }

  video.likes += 1;
  await video.save();

  res.json(video);
};

//  DISLIKE VIDEO
export const dislikeVideo = async (req, res) => {
  const video = await Video.findById(req.params.id);

  if (!video) {
    return res.status(404).json({ message: "Video not found" });
  }

  video.dislikes += 1;
  await video.save();

  res.json(video);
};

