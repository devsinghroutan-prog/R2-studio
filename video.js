/* ================= ELEMENTS ================= */
const videoPlayer = document.getElementById("videoPlayer");
const videoTitle = document.getElementById("videoTitle");
const channelName = document.getElementById("channelName");
const subBtn = document.getElementById("subBtn");
const subCount = document.getElementById("subCount");

const likeBtn = document.getElementById("likeBtn");
const dislikeBtn = document.getElementById("dislikeBtn");
const saveBtn = document.getElementById("saveBtn");

const likeCountSpan = document.getElementById("likeCount");
const dislikeCountSpan = document.getElementById("dislikeCount");
const shareCountSpan = document.getElementById("shareCount");

const commentInput = document.getElementById("commentInput");
const commentList = document.getElementById("commentList");

/* ================= LOGIN ================= */
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.innerText = localStorage.getItem("loggedIn") ? "Logout" : "Login";
  loginBtn.onclick = () => {
    if (localStorage.getItem("loggedIn")) {
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("userEmail");
      location.reload();
    } else {
      location.href = "login.html";
    }
  };
}

/* ================= LOAD VIDEO ================= */
const video = JSON.parse(localStorage.getItem("currentVideo"));
if (!video || !videoPlayer) {
  alert("Video not found");
  location.href = "index.html";
}

videoPlayer.src = video.videoSrc;
videoPlayer.load();

videoTitle.innerText = video.title;
channelName.innerText = video.channel;

/* ================= SUBSCRIBE ================= */
let subs = JSON.parse(localStorage.getItem("subs")) || [];
let counts = JSON.parse(localStorage.getItem("subCounts")) || {};

counts[video.channel] = counts[video.channel] || 0;
subCount.innerText = counts[video.channel] + " subscribers";

function updateSubBtn() {
  if (subs.includes(video.channel)) {
    subBtn.innerText = "Subscribed";
    subBtn.classList.add("subscribed");
  } else {
    subBtn.innerText = "Subscribe";
    subBtn.classList.remove("subscribed");
  }
}
updateSubBtn();

subBtn.onclick = () => {
  if (!localStorage.getItem("loggedIn")) return alert("Login required");

  if (subs.includes(video.channel)) {
    subs = subs.filter(c => c !== video.channel);
    counts[video.channel]--;
  } else {
    subs.push(video.channel);
    counts[video.channel]++;
  }

  localStorage.setItem("subs", JSON.stringify(subs));
  localStorage.setItem("subCounts", JSON.stringify(counts));
  subCount.innerText = counts[video.channel] + " subscribers";
  updateSubBtn();
};

/* ================= LIKE / DISLIKE / SHARE ================= */
let likeCount = Number(localStorage.getItem("like_" + video.id)) || 0;
let dislikeCount = Number(localStorage.getItem("dislike_" + video.id)) || 0;
let shareCount = Number(localStorage.getItem("share_" + video.id)) || 0;

let liked = localStorage.getItem("liked_" + video.id) === "true";
let disliked = localStorage.getItem("disliked_" + video.id) === "true";
let saved = localStorage.getItem("saved_" + video.id) === "true";

updateUI();

function toggleLike() {
  if (!localStorage.getItem("loggedIn")) return alert("Login required");

  if (liked) {
    likeCount--;
    liked = false;
    localStorage.removeItem("liked_" + video.id);
  } else {
    likeCount++;
    liked = true;
    localStorage.setItem("liked_" + video.id, "true");

    if (disliked) {
      dislikeCount--;
      disliked = false;
      localStorage.removeItem("disliked_" + video.id);
    }
  }
  saveCounts();
  updateUI();
}

function toggleDislike() {
  if (!localStorage.getItem("loggedIn")) return alert("Login required");

  if (disliked) {
    dislikeCount--;
    disliked = false;
    localStorage.removeItem("disliked_" + video.id);
  } else {
    dislikeCount++;
    disliked = true;
    localStorage.setItem("disliked_" + video.id, "true");

    if (liked) {
      likeCount--;
      liked = false;
      localStorage.removeItem("liked_" + video.id);
    }
  }
  saveCounts();
  updateUI();
}

function toggleSave() {
  if (!localStorage.getItem("loggedIn")) return alert("Login required");

  saved = !saved;
  if (saved) {
    localStorage.setItem("saved_" + video.id, "true");
  } else {
    localStorage.removeItem("saved_" + video.id);
  }
  updateUI();
}

function shareVideo() {
  navigator.clipboard.writeText(location.href);
  shareCount++;
  localStorage.setItem("share_" + video.id, shareCount);
  shareCountSpan.innerText = shareCount;
}

function saveCounts() {
  localStorage.setItem("like_" + video.id, likeCount);
  localStorage.setItem("dislike_" + video.id, dislikeCount);
}

function updateUI() {
  likeCountSpan.innerText = likeCount;
  dislikeCountSpan.innerText = dislikeCount;
  shareCountSpan.innerText = shareCount;

  likeBtn.classList.toggle("active", liked);
  dislikeBtn.classList.toggle("active", disliked);
  saveBtn.classList.toggle("active", saved);
}

/* ================= COMMENTS ================= */
let comments =
  JSON.parse(localStorage.getItem("comments_" + video.id)) || [
    { user: "Aman", text: "Nice video 🔥" },
    { user: "Rohit", text: "Great ride bro!" },
    { user: "Manu", text: "Camera quality amazing 😍" },
    { user: "Kunal", text: "Waiting for next vlog 🔥" }
  ];

function loadComments() {
  commentList.innerHTML = "";
  comments.forEach(c => {
    const div = document.createElement("div");
    div.className = "comment";
    div.innerHTML = `<b>${c.user}</b><p>${c.text}</p>`;
    commentList.appendChild(div);
  });
}

loadComments();

function addComment() {
  if (!localStorage.getItem("loggedIn")) return alert("Login required");

  const text = commentInput.value.trim();
  if (!text) return;

  const user = localStorage.getItem("userEmail") || "User";
  comments.unshift({ user, text });

  localStorage.setItem("comments_" + video.id, JSON.stringify(comments));
  commentInput.value = "";
  loadComments();
}
