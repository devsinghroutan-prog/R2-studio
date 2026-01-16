
const loginBtn = document.getElementById("loginBtn");
if(loginBtn){
  loginBtn.innerText = localStorage.getItem("loggedIn") ? "Logout" : "Login";
}

// login
loginBtn.onclick = ()=>{
  if(localStorage.getItem("loggedIn")){
    localStorage.removeItem("loggedIn");
    loginBtn.innerText="Login";
  }else{
    localStorage.setItem("loggedIn","true");
    loginBtn.innerText="Logout";
  }
};

// get videos
let videos = JSON.parse(localStorage.getItem("videos")) || [];

// fake ranking using likes
videos.sort((a,b)=>(b.likes||0)-(a.likes||0));

const grid = document.getElementById("trendingGrid");

// load trending
videos.forEach((video,index)=>{
  const card = document.createElement("div");
  card.className="video-card";

  card.innerHTML=`
    <span class="rank-badge">#${index+1}</span>
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
