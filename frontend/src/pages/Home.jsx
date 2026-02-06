import { useEffect, useState } from "react";
import api from "../services/api";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import FilterBar from "../components/FilterBar";
import VideoCard from "../components/VideoCard";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
  api
    .get(`/videos?search=${search}&category=${category}`)
    .then(res => setVideos(res.data));
}, [search, category]);


  const filteredVideos = videos.filter(video => {
    const matchesCategory =
      category === "All" || video.category === category;

    const matchesSearch =
      video.title.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Header search={search} setSearch={setSearch} />
      <FilterBar setCategory={setCategory} />

      <div className="layout">
        <Sidebar />
        <div className="video-grid">
          {filteredVideos.map(video => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      </div>
    </>
  );
}
