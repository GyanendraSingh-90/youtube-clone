import Channel from "../models/Channel.js";
import User from "../models/User.js";

export const createChannel = async (req, res) => {
  const { channelName, description, channelBanner } = req.body;

  const channel = await Channel.create({
    channelName,
    description,
    channelBanner,
    owner: req.userId
  });

  await User.findByIdAndUpdate(req.userId, {
    $push: { channels: channel._id }
  });

  res.status(201).json(channel);
};

export const getChannelById = async (req, res) => {
  const channel = await Channel.findById(req.params.id).populate("videos");
  res.json(channel);
};

