// ===== GET VIDEO GRID =====
const videoGrid = document.getElementById("videoGrid");

// safety
if (!videoGrid) {
  console.error("videoGrid not found");
}

// ===== HELPERS =====
function getVideos() {
  return JSON.parse(localStorage.getItem("videos")) || [];
}

function saveVideos(videos) {
  localStorage.setItem("videos", JSON.stringify(videos));
}

// ===== FIRST TIME DEFAULT VIDEOS (RUNS ONLY ONCE) =====
if (!localStorage.getItem("videos")) {
  const defaultVideos = [
    {
      id: Date.now(),
      title: "First Bike Ride",
      channel: "R2 Rider",
      thumbnail: "bike.jpg",
      videoSrc: "bike1.mp4"
    },
    {
      id: Date.now() + 1,
      title: "Second Bike Ride",
      channel: "R2 Rider",
      thumbnail: "images/",
      videoSrc: "bike.mp4"
    }
  ];
  saveVideos(defaultVideos);
}

// ===== LOAD VIDEOS =====
const videos = getVideos();
videoGrid.innerHTML = "";

// ===== RENDER =====
videos.forEach(video => {
  const card = document.createElement("div");
  card.className = "video-card";

  card.innerHTML = `
    <div class="video-thumb">
      <img src="${video.thumbnail}" alt="thumbnail">
    </div>
    <div class="video-info">
      <h4>${video.title}</h4>
      <p>${video.channel}</p>
    </div>
  `;

  card.addEventListener("click", () => {
    localStorage.setItem("currentVideo", JSON.stringify(video));
    window.location.href = "video.html";
  });

  videoGrid.appendChild(card);
});

