
const loginBtn = document.getElementById("loginBtn");
if(loginBtn){
  loginBtn.innerText = localStorage.getItem("loggedIn") ? "Logout" : "Login";
}
// get current video
const currentVideo = JSON.parse(localStorage.getItem("currentVideo"));
if(!currentVideo) return;

// storage
let liked = JSON.parse(localStorage.getItem("liked")) || [];
let saved = JSON.parse(localStorage.getItem("saved")) || [];
let history = JSON.parse(localStorage.getItem("history")) || [];

// save history (once)
if(!history.find(v => v.id === currentVideo.id)){
  history.unshift(currentVideo);
  localStorage.setItem("history", JSON.stringify(history));
}

/* LIKE */
function likeVideo(){
  if(!localStorage.getItem("loggedIn")){
    alert("Login required");
    return;
  }
  if(liked.find(v => v.id === currentVideo.id)){
    alert("Already liked");
    return;
  }
  liked.push(currentVideo);
  localStorage.setItem("liked", JSON.stringify(liked));
  alert("Liked");
}

/* SAVE */
function saveVideo(){
  if(!localStorage.getItem("loggedIn")){
    alert("Login required");
    return;
  }
  if(saved.find(v => v.id === currentVideo.id)){
    saved = saved.filter(v => v.id !== currentVideo.id);
    alert("Removed from saved");
  }else{
    saved.push(currentVideo);
    alert("Saved");
  }
  localStorage.setItem("saved", JSON.stringify(saved));
}
sidebar.onclick = (e)=> e.stopPropagation();
