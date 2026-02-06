import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function VideoPlayer() {
  const { id } = useParams();

  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    api.get(`/videos/${id}`)
    .then(res => setVideo(res.data))
    .catch(err => console.log(err));
    api.get(`/comments/${id}`).then(res => setComments(res.data));
  }, [id]);

  if(!video) 
    return <p>Loading...</p>;
   // Check if YouTube URL
  const isYouTube = video.videoUrl.includes("youtube.com") ||
                    video.videoUrl.includes("youtu.be");

  // Convert YouTube URL → embed URL
  const getEmbedUrl = (url) => {
    if (url.includes("watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    if (url.includes("youtu.be/")) {
      return url.replace("youtu.be/", "www.youtube.com/embed/");
    }
    return url;
  };

  //  LIKE
  const likeVideo = async () => {
    const res = await api.put(`/videos/${id}/like`);
    setVideo(res.data);
  };

  //  DISLIKE
  const dislikeVideo = async () => {
    const res = await api.put(`/videos/${id}/dislike`);
    setVideo(res.data);
  };

  //  ADD COMMENT
  const addComment = async () => {
    const res = await api.post("/comments", {
      videoId: id,
      text
    });
    setComments([...comments, res.data]);
    setText("");
  };

  if (!video) return <p>Loading...</p>;

  return (
    <div className="video-player-page">
      <h2>{video.title}</h2>
    <div>
      {/* VIDEO PLAYER */}
      <div className="video-container">
        {isYouTube ? (
          <iframe
            width="100%"
            height="400"
            src={getEmbedUrl(video.videoUrl)}
            title={video.title}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        ) : (
          <video controls width="100%">
            <source src={video.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      <p>{video.description}</p>

      {/* VIDEO DETAILS */}
      <h2>{video.title}</h2>
      <p>{video.description}</p>

      {/*  LIKE / DISLIKE BUTTONS (THIS IS THE ANSWER) */}
      <div className="likes">
        <button onClick={likeVideo}>👍 {video.likes}</button>
        <button onClick={dislikeVideo}>👎 {video.dislikes}</button>
      </div>

      {/*  COMMENTS SECTION */}
      <h3>Comments</h3>
      {comments.map(c => (
        <p key={c._id}>{c.text}</p>
      ))}

      <input
        value={text}
        placeholder="Add comment"
        onChange={e => setText(e.target.value)}
      />
      <button onClick={addComment}>Post</button>
    </div>
    </div>
  );
}
