const loginBtn = document.getElementById("loginBtn");
if(loginBtn){
  loginBtn.innerText = localStorage.getItem("loggedIn") ? "Logout" : "Login";
}

let videos = [
  {
    id:1,
    title:"R15 Bike Ride",
    channel:"R2 Rider",
    thumbnail:"images/bike-thumb.jpg",
    videoSrc:"videos/bike.mp4",
    likes:0
  }
];

if(!localStorage.getItem("videos")){
  localStorage.setItem("videos",JSON.stringify(videos));
}

videos = JSON.parse(localStorage.getItem("videos"));

const grid = document.getElementById("videoGrid");

videos.forEach(video=>{
  const card=document.createElement("div");
  card.className="video-card";

  card.innerHTML=`
    <div class="video-thumb">
      <img src="${video.thumbnail}">
    </div>
    <div class="video-info">
      <h4>${video.title}</h4>
      <p>${video.channel}</p>
    </div>
  `;

  card.onclick=()=>{
    localStorage.setItem("currentVideo",JSON.stringify(video));
    location.href="video.html";
  };

  grid.appendChild(card);
});
sidebar.onclick = (e)=> e.stopPropagation();
