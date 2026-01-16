
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

// upload
uploadBtn.onclick = ()=>{
  if(!localStorage.getItem("loggedIn")){
    alert("Login required");
    return;
  }

  const titleVal = title.value.trim();
  const channelVal = channel.value.trim();
  const thumbVal = thumbPath.value.trim();
  const videoVal = videoPath.value.trim();

  if(!titleVal || !channelVal || !thumbVal || !videoVal){
    alert("Fill all fields");
    return;
  }

  let videos = JSON.parse(localStorage.getItem("videos")) || [];

  videos.push({
    id: Date.now(),
    title: titleVal,
    channel: channelVal,
    thumbnail: thumbVal,
    videoSrc: videoVal,
    likes: 0
  });

  localStorage.setItem("videos", JSON.stringify(videos));
  alert("Video added");
  location.href = "index.html";
};
sidebar.onclick = (e)=> e.stopPropagation();
