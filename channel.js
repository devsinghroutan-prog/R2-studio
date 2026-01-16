
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

// channel data
const channelNameParam =
  new URLSearchParams(location.search).get("name");

channelTitle.innerText = channelNameParam || "Channel";

// subs
let subs = JSON.parse(localStorage.getItem("subs")) || [];
let counts = JSON.parse(localStorage.getItem("subCounts")) || {};
counts[channelNameParam] = counts[channelNameParam] || 0;

channelSubs.innerText = counts[channelNameParam] + " subscribers";

function updateSubBtn(){
  if(subs.includes(channelNameParam)){
    subBtn.innerText="Subscribed";
    subBtn.classList.add("subscribed");
  }
}
updateSubBtn();

subBtn.onclick = ()=>{
  if(!localStorage.getItem("loggedIn")){
    alert("Login required");
    return;
  }
  if(subs.includes(channelNameParam)){
    subs = subs.filter(c=>c!==channelNameParam);
    counts[channelNameParam]--;
    subBtn.innerText="Subscribe";
    subBtn.classList.remove("subscribed");
  }else{
    subs.push(channelNameParam);
    counts[channelNameParam]++;
    subBtn.innerText="Subscribed";
    subBtn.classList.add("subscribed");
  }
  localStorage.setItem("subs",JSON.stringify(subs));
  localStorage.setItem("subCounts",JSON.stringify(counts));
  channelSubs.innerText = counts[channelNameParam]+" subscribers";
};

// channel videos
const videos = JSON.parse(localStorage.getItem("videos")) || [];
const grid = document.getElementById("channelGrid");

videos
  .filter(v=>v.channel===channelNameParam)
  .forEach(video=>{
    const card=document.createElement("div");
    card.className="video-card";
    card.innerHTML=`
      <div class="video-thumb">
        <img src="${video.thumbnail}">
      </div>
      <div class="video-info">
        <h4>${video.title}</h4>
      </div>
    `;
    card.onclick=()=>{
      localStorage.setItem("currentVideo",JSON.stringify(video));
      location.href="video.html";
    };
    grid.appendChild(card);
  });
sidebar.onclick = (e)=> e.stopPropagation();
