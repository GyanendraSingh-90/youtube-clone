import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Channel() {
  const { id } = useParams();
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    api.get(`/channels/${id}`).then(res => setChannel(res.data));
  }, []);

  if (!channel) return null;

  return (
    <div>
      <h1>{channel.channelName}</h1>
      <p>{channel.description}</p>

      <h3>Videos</h3>
      {channel.videos.map(v => (
        <p key={v._id}>{v.title}</p>
      ))}
    </div>
  );
}
