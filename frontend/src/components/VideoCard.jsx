import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
  return (
    <Link to={`/video/${video._id}`} style={{ width: 250 }}>
      <img src={video.thumbnailUrl} width="250" />
      <h4>{video.title}</h4>
      <p>{video.views} views</p>
    </Link>
  );
}
