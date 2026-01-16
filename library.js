
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

// data
const videos = JSON.parse(localStorage.getItem("videos")) || [];
const history = JSON.parse(localStorage.getItem("history")) || [];
const liked = JSON.parse(localStorage.getItem("liked")) || [];
const saved = JSON.parse(localStorage.getItem("saved")) || [];

// helper
function loadGrid(list, gridId){
  const grid = document.getElementById(gridId);
  grid.innerHTML="";

  list.forEach(video=>{
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
}

// load sections
loadGrid(history,"historyGrid");
loadGrid(liked,"likedGrid");
loadGrid(saved,"savedGrid");

// your videos = uploaded videos
loadGrid(videos,"yourGrid");
sidebar.onclick = (e)=> e.stopPropagation();
