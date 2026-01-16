function getVideos() {
  return JSON.parse(localStorage.getItem("videos")) || [];
}

function saveVideos(videos) {
  localStorage.setItem("videos", JSON.stringify(videos));
}

function addVideo(video) {
  const videos = getVideos();   // purani videos
  videos.push(video);           // nayi add
  saveVideos(videos);           // wapas save
}
